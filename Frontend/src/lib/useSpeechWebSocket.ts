import { useCallback, useEffect, useRef, useState } from "react";

type SpeechStatus = "idle" | "connecting" | "running" | "closed" | "error";

type Metrics = { filler_count: number; pause_seconds: number; total_words: number };

function getWsUrl() {
  return (import.meta.env.VITE_WS_URL as string | undefined) ?? "ws://localhost:8000/api/speech/ws";
}

export function useSpeechWebSocket() {
  const wsRef = useRef<WebSocket | null>(null);
  const mediaRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [status, setStatus] = useState<SpeechStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [metrics, setMetrics] = useState<Metrics>({ filler_count: 0, pause_seconds: 0, total_words: 0 });

  const cleanupAudio = useCallback(() => {
    processorRef.current?.disconnect();
    processorRef.current = null;

    mediaRef.current?.getTracks().forEach((t) => t.stop());
    mediaRef.current = null;

    const ctx = audioCtxRef.current;
    audioCtxRef.current = null;
    if (ctx && ctx.state !== "closed") {
      ctx.close().catch(() => {
        // ignore
      });
    }
  }, []);

  const start = useCallback(async () => {
    if (wsRef.current) return;

    setStatus("connecting");
    const ws = new WebSocket(getWsUrl());
    wsRef.current = ws;

    ws.onopen = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        mediaRef.current = stream;

        const ctx = new AudioContext({ sampleRate: 16000 });
        audioCtxRef.current = ctx;
        const source = ctx.createMediaStreamSource(stream);

        const processor = ctx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        source.connect(processor);
        processor.connect(ctx.destination);

        processor.onaudioprocess = (e) => {
          if (ws.readyState !== WebSocket.OPEN) return;

          const input = e.inputBuffer.getChannelData(0);
          const pcm16 = new Int16Array(input.length);
          for (let i = 0; i < input.length; i++) {
            const s = Math.max(-1, Math.min(1, input[i] ?? 0));
            pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
          }

          const bytes = new Uint8Array(pcm16.buffer);
          let binary = "";
          for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]!);
          const b64 = btoa(binary);

          ws.send(JSON.stringify({ type: "audio", pcm16_b64: b64, sample_rate: 16000 }));
        };

        setStatus("running");
      } catch {
        setStatus("error");
        cleanupAudio();
        wsRef.current = null;
        try {
          ws.close();
        } catch {
          // ignore
        }
      }
    };

    ws.onmessage = (evt) => {
      try {
        const msg = JSON.parse(evt.data);
        if (msg.type === "transcript") {
          setTranscript((prev) => {
            if (msg.is_final) return prev + (prev ? " " : "") + msg.text;
            return prev;
          });
          if (msg.metrics) setMetrics(msg.metrics);
        }
        if (msg.type === "closed") {
          if (msg.metrics) setMetrics(msg.metrics);
          setStatus("closed");
        }
      } catch {
        // ignore
      }
    };

    ws.onerror = () => {
      setStatus("error");
      cleanupAudio();
      wsRef.current = null;
    };

    ws.onclose = () => {
      cleanupAudio();
      wsRef.current = null;
      setStatus((s) => (s === "error" ? "error" : "closed"));
    };
  }, []);

  const stop = useCallback(() => {
    const ws = wsRef.current;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ type: "end" }));
    }

    cleanupAudio();

    try {
      ws?.close();
    } catch {
      // ignore
    }
    wsRef.current = null;
    setStatus("closed");
  }, [cleanupAudio]);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return { status, transcript, metrics, start, stop };
}
