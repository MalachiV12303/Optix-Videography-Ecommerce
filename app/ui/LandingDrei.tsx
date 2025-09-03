"use client";
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useFrame, ThreeElements, useThree } from '@react-three/fiber'
import { Center, Text3D } from '@react-three/drei'
import MousePanGroup from './MousePanGroup';

export default function LandingDrei() {
  const [, setPrimaryColor] = useState<string>(getCssVar("--primary"));
  const [foregroundColor, setForegroundColor] = useState<string>(getCssVar("--foreground"));
  // Sync color with theme (CSS vars)
  useEffect(() => {
    const updateTheme = () => {
      setPrimaryColor(getCssVar("--primary"))
      setForegroundColor(getCssVar("--foreground"))
    };
    // Initial color
    updateTheme();
    // Watch for theme changes
    const observer = onThemeChange(updateTheme);
    return () => observer.disconnect();
  }, []);

  return (
    <Canvas
      // dpr={0.35}
      gl={{ antialias: false }}
      style={{
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        background: 'transparent',
      }}>
      <Suspense fallback={null} >
        <MousePanGroup intensity={0.08}>
          <ambientLight intensity={Math.PI} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI * 4} />
          <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
          <LandingScene foreground={foregroundColor} />
        </MousePanGroup>
      </Suspense>
    </Canvas>
  )
}

function LandingScene({ props, foreground }: { props?: ThreeElements["mesh"], foreground: string }) {
  const icoRef = useRef<THREE.Mesh>(null!);
  const textRef = useRef<THREE.Mesh>(null!);
  const { viewport, mouse } = useThree();
  const [scale, setScale] = useState(1);

  // Animate rotation + text lookAt
  useFrame((state, delta) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    textRef.current.lookAt(x, y, 30);
    icoRef.current.rotation.x += delta / 2;
    icoRef.current.rotation.z += delta / 2;
  });

  // Responsive scaling
  useEffect(() => {
    setScale(viewport.width < 5.94 ? 0.5 : 1);
  }, [viewport]);

  return (
    <>
      <mesh {...props} scale={scale} ref={textRef}>
        <Center>
          <Text3D font={"/Cinzel_Regular.json"}>
            gleam
            <meshStandardMaterial color={foreground} />
          </Text3D>
        </Center>
      </mesh>
      <mesh {...props} scale={scale} ref={icoRef}>
        <icosahedronGeometry args={[2]} />
        <meshStandardMaterial wireframe color={foreground} />
      </mesh>
    </>
  );
}

// Utility: read CSS variable
function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

// Utility: watch for theme change (data-theme on <html>)
function onThemeChange(callback: () => void) {
  const observer = new MutationObserver(() => callback());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return observer;
}