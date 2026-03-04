import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef } from "react";

type Props = {
  className?: string;
};

export function RoboticScene({ className = "" }: Props) {
  return (
    <div className={`relative ${className}`} aria-hidden>
      <Canvas
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.2, 3.4], fov: 45 }}
        style={{ pointerEvents: "none" }}
      >
        <color attach="background" args={["transparent"]} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 2, 2]} intensity={0.9} />
        <directionalLight position={[-2, -1, 1]} intensity={0.35} color={new THREE.Color("#a855f7")} />

        <SceneObjects />
      </Canvas>

      {/* Soft overlay for “videographed” look */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.18),transparent_55%),radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.18),transparent_60%)] opacity-70" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/40" />
    </div>
  );
}

function SceneObjects() {
  const rig = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshStandardMaterial>>(null);

  const mats = useMemo(() => {
    return {
      robotic: new THREE.MeshStandardMaterial({ color: "#64748b", metalness: 0.85, roughness: 0.25 }),
      primary: new THREE.MeshStandardMaterial({ color: "#6366f1", emissive: "#6366f1", emissiveIntensity: 0.25, metalness: 0.4, roughness: 0.35 }),
      accent: new THREE.MeshStandardMaterial({ color: "#a855f7", emissive: "#a855f7", emissiveIntensity: 0.18, metalness: 0.35, roughness: 0.4 }),
      neural: new THREE.MeshStandardMaterial({ color: "#06b6d4", emissive: "#06b6d4", emissiveIntensity: 0.35, metalness: 0.25, roughness: 0.35 }),
    } as const;
  }, []);

  useFrame((state: { clock: { getElapsedTime: () => number } }) => {
    const t = state.clock.getElapsedTime();
    if (rig.current) {
      rig.current.rotation.y = Math.sin(t * 0.18) * 0.18;
      rig.current.rotation.x = Math.sin(t * 0.13) * 0.06;
      rig.current.position.y = Math.sin(t * 0.35) * 0.05;
    }
    if (armL.current) armL.current.rotation.z = Math.sin(t * 0.9) * 0.18 - 0.12;
    if (armR.current) armR.current.rotation.z = Math.sin(t * 0.85 + 1.0) * 0.18 + 0.12;
    if (core.current) {
      core.current.rotation.y = t * 0.4;
      core.current.material.emissiveIntensity = 0.25 + Math.sin(t * 1.8) * 0.08;
    }
  });

  return (
    <group ref={rig}>
      <mesh position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]} material={mats.robotic}>
        <planeGeometry args={[6, 3]} />
      </mesh>

      <mesh position={[0, -0.12, 0]} material={mats.robotic}>
        <boxGeometry args={[1.35, 0.8, 0.7]} />
      </mesh>

      <mesh position={[0, 0.55, 0]} material={mats.robotic}>
        <boxGeometry args={[0.9, 0.48, 0.55]} />
      </mesh>

      <mesh position={[-0.18, 0.57, 0.3]} material={mats.neural}>
        <sphereGeometry args={[0.06, 24, 24]} />
      </mesh>
      <mesh position={[0.18, 0.57, 0.3]} material={mats.neural}>
        <sphereGeometry args={[0.06, 24, 24]} />
      </mesh>

      <mesh ref={core} position={[0, -0.12, 0.36]} material={mats.primary}>
        <torusKnotGeometry args={[0.14, 0.05, 100, 12]} />
      </mesh>

      <group ref={armL} position={[-0.86, 0.05, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={mats.robotic}>
          <cylinderGeometry args={[0.08, 0.08, 0.7, 20]} />
        </mesh>
        <mesh position={[-0.35, -0.15, 0.1]} material={mats.accent}>
          <boxGeometry args={[0.28, 0.16, 0.22]} />
        </mesh>
      </group>
      <group ref={armR} position={[0.86, 0.05, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]} material={mats.robotic}>
          <cylinderGeometry args={[0.08, 0.08, 0.7, 20]} />
        </mesh>
        <mesh position={[0.35, -0.15, 0.1]} material={mats.accent}>
          <boxGeometry args={[0.28, 0.16, 0.22]} />
        </mesh>
      </group>

      {Array.from({ length: 10 }, (_, i) => (
        <mesh
          key={i}
          position={[
            -1.4 + (i % 5) * 0.7,
            -0.2 + Math.floor(i / 5) * 0.6,
            -0.7 + (i % 3) * 0.25,
          ]}
          material={mats.neural}
        >
          <sphereGeometry args={[0.035, 18, 18]} />
        </mesh>
      ))}
    </group>
  );
}
