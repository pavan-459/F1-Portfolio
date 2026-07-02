"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function SpeedKnot() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.25;
    meshRef.current.rotation.z += delta * 0.05;

    const targetX = pointer.current.y * 0.3;
    const targetY = pointer.current.x * 0.4;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      meshRef.current.rotation.x + targetX * delta,
      0.02
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      meshRef.current.rotation.y + targetY * delta,
      0.02
    );
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[2.1, 0, 0]} scale={0.85}>
        <torusKnotGeometry args={[1, 0.32, 220, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#12173c"
          emissive="#e10600"
          emissiveIntensity={0.12}
          roughness={0.35}
          metalness={0.4}
          distort={0.15}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

export default function RaceCar() {
  return <SpeedKnot />;
}
