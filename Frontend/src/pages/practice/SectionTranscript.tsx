import { useEffect, useMemo, useRef, useState } from "react";

type SpeechStatus = "idle" | "connecting" | "running" | "closed" | "error";

type Props = {
  status: SpeechStatus;
  sessionId?: string;
  category?: string;
  topic?: string;
  onStart?: () => void;
  onStop?: () => void;
};

type Message = {
  type: "user" | "ai";
  content: string;
  timestamp: number;
};

type WsStatus = "disconnected" | "connecting" | "connected";

export function SectionTranscript({ status, sessionId, category, topic, onStart, onStop }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [realTimeTranscript, setRealTimeTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const refs = useRef<{
    ws: WebSocket | null;
    audioEl: HTMLAudioElement | null;
    scrollEl: HTMLDivElement | null;
    stream: MediaStream | null;
    ctx: AudioContext | null;
    source: MediaStreamAudioSourceNode | null;
    processor: ScriptProcessorNode | null;
    silenceTimer: number | null;
    lastQuestion: string;
  }>({
    ws: null,
    audioEl: null,
    scrollEl: null,
    stream: null,
    ctx: null,
    source: null,
    processor: null,
    silenceTimer: null,
    lastQuestion: "",
  });

  const wsUrl = useMemo(() => {
    if (!sessionId) return null;
    return `ws://localhost:8000/ws/${sessionId}`;
  }, [sessionId]);

  const stopAllAudio = () => {
    if (refs.current.silenceTimer) clearTimeout(refs.current.silenceTimer);
    refs.current.silenceTimer = null;
    try {
      refs.current.processor?.disconnect();
    } catch {
      // ignore
    }
    refs.current.processor = null;

    try {
      refs.current.source?.disconnect();
    } catch {
      // ignore
    }
    refs.current.source = null;

    const ctx = refs.current.ctx;
    refs.current.ctx = null;
    if (ctx && ctx.state !== "closed") ctx.close().catch(() => undefined);

    refs.current.stream?.getTracks().forEach((t) => t.stop());
    refs.current.stream = null;
  };

  const startAudioStreaming = async () => {
    const ws = refs.current.ws;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    if (refs.current.processor || refs.current.ctx || refs.current.stream) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 16000,
      },
    });
    refs.current.stream = stream;

    const ctx = new AudioContext({ sampleRate: 16000 });
    refs.current.ctx = ctx;
    const source = ctx.createMediaStreamSource(stream);
    refs.current.source = source;

    const processor = ctx.createScriptProcessor(4096, 1, 1);
    refs.current.processor = processor;

    source.connect(processor);
    processor.connect(ctx.destination);

    processor.onaudioprocess = (event) => {
      const ws2 = refs.current.ws;
      if (!ws2 || ws2.readyState !== WebSocket.OPEN) return;

      const inputData = event.inputBuffer.getChannelData(0);
      const pcmData = new Int16Array(inputData.length);
      for (let i = 0; i < inputData.length; i++) {
        pcmData[i] = Math.max(-32768, Math.min(32767, inputData[i] * 32768));
      }

      const pcmBytes = new Uint8Array(pcmData.buffer);
      const base64Audio = btoa(String.fromCharCode(...pcmBytes));
      ws2.send(JSON.stringify({ type: "audio_data", data: base64Audio }));
    };
  };

  const playTtsAudio = (base64Audio: string) => {
    const el = refs.current.audioEl;
    if (!el) return;
    try {
      const url = URL.createObjectURL(
        new Blob([Uint8Array.from(atob(base64Audio), (c) => c.charCodeAt(0))], { type: "audio/mpeg" }),
      );
      el.onended = null;
      el.src = url;
      void el.play();
    } catch {
      // ignore
    }
  };

  const requestNextQuestion = () => {
    const ws = refs.current.ws;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    setIsLoading(true);
    if (currentQuestion) {
      setMessages((prev) => [...prev, { type: "ai", content: currentQuestion, timestamp: Date.now() }]);
    }

    if (status === "running") onStop?.();
    stopAllAudio();
    setCurrentQuestion("");
    refs.current.lastQuestion = "";
    setRealTimeTranscript("");

    ws.send(JSON.stringify({ type: "next_question" }));
    window.setTimeout(() => setIsLoading(false), 600);
  };

  useEffect(() => {
    const node = refs.current.scrollEl;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages.length, currentQuestion, realTimeTranscript]);

  useEffect(() => {
    if (!wsUrl || !sessionId || !category || !topic) {
      return;
    }

    const ws = new WebSocket(wsUrl);
    refs.current.ws = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "start_session", category, topic_id: topic }));
    };

    ws.onmessage = (event) => {
      let data: any;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }
      if (!data || typeof data.type !== "string") return;

      if (data.type === "ai_message") {
        const q = String(data.content ?? "");
        setCurrentQuestion(q);
        refs.current.lastQuestion = q;
        setRealTimeTranscript("");
        if (refs.current.silenceTimer) clearTimeout(refs.current.silenceTimer);
        refs.current.silenceTimer = null;
        ws.send(JSON.stringify({ type: "get_audio", text: q }));
        return;
      }

      if (data.type === "audio_response") {
        if (typeof data.data === "string") {
          playTtsAudio(data.data);
          const el = refs.current.audioEl;
          if (el) {
            el.onended = () => {
              if (status !== "running") onStart?.();
            };
          }
        }
        return;
      }

      if (data.type === "realtime_transcript") {
        setRealTimeTranscript(String(data.text ?? ""));
        if (refs.current.silenceTimer) clearTimeout(refs.current.silenceTimer);
        refs.current.silenceTimer = window.setTimeout(() => {
          stopAllAudio();
          if (status === "running") onStop?.();
        }, 5000);
        return;
      }

      if (data.type === "final_transcript") {
        const answer = String(data.text ?? "");
        const q = refs.current.lastQuestion;
        if (q) {
          setMessages((prev) => [
            ...prev,
            { type: "ai", content: q, timestamp: Date.now() },
            { type: "user", content: answer, timestamp: Date.now() },
          ]);
        }
        setCurrentQuestion("");
        refs.current.lastQuestion = "";
        setRealTimeTranscript("");
        if (refs.current.silenceTimer) clearTimeout(refs.current.silenceTimer);
        refs.current.silenceTimer = null;
        return;
      }
    };

    return () => {
      try {
        ws.close();
      } catch {
        // ignore
      }
      if (refs.current.ws === ws) refs.current.ws = null;
      stopAllAudio();
    };
  }, [wsUrl, sessionId, category, topic, onStart, onStop, status]);

  useEffect(() => {
    if (status === "running" && currentQuestion) {
      startAudioStreaming().catch(() => {
        // ignore
      });
      return;
    }
    stopAllAudio();
  }, [status, currentQuestion]);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-200/80 backdrop-blur border border-white/50 min-h-[500px] max-h-[600px] flex flex-col">
      <audio ref={(n) => void (refs.current.audioEl = n)} className="hidden" />

      <div className="mb-4 text-sm font-semibold text-zinc-700">section transcript</div>

      <div ref={(n) => void (refs.current.scrollEl = n)} className="flex-1 overflow-y-auto space-y-4 mb-4">
        {currentQuestion && (
          <div className="p-4 bg-violet-50 border border-violet-200 rounded-2xl">
            <div className="flex items-start gap-2 mb-3">
              <div className="text-sm font-semibold text-violet-700">Question:</div>
              <div className="flex-1 text-sm text-violet-900">{currentQuestion}</div>
            </div>

            <div className="p-4 bg-white border-2 border-violet-300 rounded-xl">
              <div className="flex items-start gap-2">
                <div className="text-sm font-semibold text-violet-600 min-w-fit">User:</div>
                <div className="flex-1 text-base text-zinc-800 leading-relaxed">
                  {realTimeTranscript || "Speak your response..."}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {messages.length === 0 && !currentQuestion ? (
            <div className="text-zinc-400 text-sm italic">Waiting for session to start...</div>
          ) : (
            messages.map((m, idx) => (
              <div key={idx} className={`flex ${m.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${m.type === "user" ? "bg-violet-500 text-white" : "bg-zinc-100 text-zinc-800"}`}
                >
                  <div className="font-medium mb-1">{m.type === "ai" ? "AI Coach" : "You"}</div>
                  <div>{m.content}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
        <div className="text-xs text-zinc-500">{status === "running" ? "Listening..." : "Ready"}</div>

        <button
          onClick={requestNextQuestion}
          disabled={isLoading || !refs.current.ws || refs.current.ws.readyState !== WebSocket.OPEN}
          className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-xl hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Loading..." : "Next Question"}
        </button>
      </div>
    </div>
  );
}
