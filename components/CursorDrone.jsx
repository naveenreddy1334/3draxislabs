"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SIZE = 170; // px — the trailing box's width/height
const ARM_ANGLES_DEG = [45, 135, 225, 315]; // X-frame layout
const ARM_LENGTH = 0.34;

/**
 * PLACEHOLDER GEOMETRY.
 * When you have a real model, drop it in /public/models/drone.glb and
 * replace the contents of this component with:
 *
 *   import { useGLTF } from "@react-three/drei";
 *   const { scene } = useGLTF("/models/drone.glb");
 *   return <primitive object={scene} scale={0.4} />;
 *
 * The banking/pitching/bobbing logic in Drone() below doesn't need to change.
 */
function DroneBody() {
  return (
    <>
      {/* chassis plate */}
      <mesh castShadow>
        <boxGeometry args={[0.16, 0.035, 0.16]} />
        <meshStandardMaterial
          color="#7d93b8"
          emissive="#2a8fae"
          emissiveIntensity={0.25}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      {/* FPV camera pod, tilted slightly forward */}
      <group position={[0, 0.01, 0.1]} rotation={[0.3, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#5c6f8f" metalness={0.5} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.038]}>
          <circleGeometry args={[0.026, 16]} />
          <meshStandardMaterial
            color="#5ee1ff"
            emissive="#5ee1ff"
            emissiveIntensity={1.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* nav lights */}
      <mesh position={[0, 0.01, 0.09]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial color="#ff3b3b" emissive="#ff3b3b" emissiveIntensity={2.2} />
      </mesh>
      <mesh position={[0, 0.01, -0.09]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshStandardMaterial color="#4dff8f" emissive="#4dff8f" emissiveIntensity={2.2} />
      </mesh>

      {ARM_ANGLES_DEG.map((deg) => (
        <Arm key={deg} angleDeg={deg} />
      ))}
    </>
  );
}

function Arm({ angleDeg }) {
  const rad = (angleDeg * Math.PI) / 180;
  const tipX = Math.cos(rad) * ARM_LENGTH;
  const tipZ = Math.sin(rad) * ARM_LENGTH;

  return (
    <group>
      <mesh position={[tipX / 2, 0, tipZ / 2]} rotation={[0, -rad, 0]}>
        <boxGeometry args={[ARM_LENGTH, 0.02, 0.024]} />
        <meshStandardMaterial color="#5c6f8f" metalness={0.55} roughness={0.3} />
      </mesh>

      <mesh position={[tipX, 0, tipZ]}>
        <cylinderGeometry args={[0.026, 0.03, 0.03, 16]} />
        <meshStandardMaterial color="#455873" metalness={0.7} roughness={0.25} />
      </mesh>

      {/* ducted prop guard */}
      <mesh position={[tipX, 0.006, tipZ]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.09, 0.005, 8, 32]} />
        <meshStandardMaterial
          color="#5ee1ff"
          emissive="#5ee1ff"
          emissiveIntensity={0.4}
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.7}
        />
      </mesh>

      <RotorBlade position={[tipX, 0.018, tipZ]} />
    </group>
  );
}

function RotorBlade({ position }) {
  const blade = useRef();
  useFrame((_, delta) => {
    blade.current.rotation.y += delta * 30;
  });
  return (
    <group ref={blade} position={position}>
      <mesh>
        <boxGeometry args={[0.15, 0.006, 0.016]} />
        <meshStandardMaterial
          color="#5ee1ff"
          emissive="#5ee1ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.5}
        />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.15, 0.006, 0.016]} />
        <meshStandardMaterial
          color="#5ee1ff"
          emissive="#5ee1ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

function Drone({ velocityRef }) {
  const group = useRef();

  useFrame((state) => {
    if (!group.current) return;
    const { x: vx, y: vy } = velocityRef.current;

    const targetBank = THREE.MathUtils.clamp(-vx * 0.06, -0.6, 0.6);
    const targetPitch = THREE.MathUtils.clamp(vy * 0.06, -0.4, 0.4);

    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, targetBank, 0.15);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetPitch, 0.15);
    group.current.position.y = Math.sin(state.clock.elapsedTime * 3) * 0.04;
  });

  return (
    <group ref={group} scale={1.1}>
      <DroneBody />
    </group>
  );
}

export default function CursorDrone() {
  const wrapperRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const started = useRef(false);
  const suppressed = useRef(false);
  const noFlyRect = useRef(null);

  useEffect(() => {
    pos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    target.current = { ...pos.current };

    function updateNoFlyZone() {
      const el = document.getElementById("radar-hitzone");
      noFlyRect.current = el ? el.getBoundingClientRect() : null;
    }
    updateNoFlyZone();
    window.addEventListener("resize", updateNoFlyZone);
    window.addEventListener("scroll", updateNoFlyZone, { passive: true });
    // covers layout shifts from web fonts loading in, images, etc.
    const zoneInterval = setInterval(updateNoFlyZone, 1000);

    function handleMove(e) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      started.current = true;

      const rect = noFlyRect.current;
      if (rect) {
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const r = rect.width / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        suppressed.current = dx * dx + dy * dy <= r * r;
      } else {
        suppressed.current = false;
      }
    }

    function tick() {
      const p = pos.current;
      const t = target.current;
      const prevX = p.x;
      const prevY = p.y;

      p.x += (t.x - p.x) * 0.12;
      p.y += (t.y - p.y) * 0.12;

      velocity.current.x = p.x - prevX;
      velocity.current.y = p.y - prevY;

      if (wrapperRef.current && started.current) {
        wrapperRef.current.style.transform =
          `translate3d(${p.x - SIZE / 2}px, ${p.y - SIZE / 2}px, 0)`;
        wrapperRef.current.style.opacity = suppressed.current ? "0" : "1";
      }

      rafId.current = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", handleMove);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("resize", updateNoFlyZone);
      window.removeEventListener("scroll", updateNoFlyZone);
      clearInterval(zoneInterval);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="cursor-drone-layer"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: SIZE,
        height: SIZE,
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0,
        transition: "opacity 0.3s ease",
        willChange: "transform",
      }}
    >
      <div className="cursor-drone-glow" aria-hidden="true"></div>
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <ambientLight intensity={0.55} />
        <pointLight position={[2, 2, 3]} intensity={16} color="#5ee1ff" />
        <pointLight position={[-2, -1, 2]} intensity={8} color="#ffffff" />
        <pointLight position={[0, -2, 1]} intensity={5} color="#ff5fa8" />
        <Drone velocityRef={velocity} />
      </Canvas>
    </div>
  );
}
