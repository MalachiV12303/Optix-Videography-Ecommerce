"use client";
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useFrame, ThreeElements, useThree } from '@react-three/fiber';
import { Center, Text3D } from '@react-three/drei';
import MousePanGroup from './MousePanGroup';

export default function LandingDrei() {
  const [, setPrimaryColor] = useState<string>(getCssVar("--primary"));
  const [foregroundColor, setForegroundColor] = useState<string>(getCssVar("--foreground"));
  
  useEffect(() => {
    const updateTheme = () => {
      setPrimaryColor(getCssVar("--primary"))
      setForegroundColor(getCssVar("--foreground"))
    };
    updateTheme();
    const observer = onThemeChange(updateTheme);
    return () => observer.disconnect();
  }, []);

  return (
  <div
    style={{
      position: "relative",
      height: "40vh",
      width: "100%",
      overflow: "visible", // important
    }}
  >
    <Canvas
      eventSource={document.body}
      eventPrefix="client"
      gl={{ antialias: false }}
      style={{
        position: "absolute",
        top: "-30vh", // extend upward
        left: 0,
        height: "100vh",
        width: "100%",
        pointerEvents: "none",
        background: "transparent",
        zIndex: -5,
      }}
    >
      <Suspense fallback={null}>
        <MousePanGroup intensity={0.15}>
          <ambientLight intensity={Math.PI} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI * 4}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <LandingScene foreground={foregroundColor} />
        </MousePanGroup>
      </Suspense>
    </Canvas>
  </div>
);

}

function LandingScene({ props, foreground }: { props?: ThreeElements["mesh"], foreground: string }) {
  const icoRef = useRef<THREE.Mesh>(null!);
  const textRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();
  const globalMouse = useGlobalMouse();

  const [scale, setScale] = useState(1);

  useFrame((state, delta) => {
    const x = (globalMouse.current.x * viewport.width) / 2;
    const y = (globalMouse.current.y * viewport.height) / 2;

    textRef.current.lookAt(x, y, 30);
    icoRef.current.rotation.x += delta / 4;
    icoRef.current.rotation.z += delta / 4;
  });

  useEffect(() => {
    setScale(viewport.width < 5.94 ? 0.5 : 0.6);
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

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
};

function onThemeChange(callback: () => void) {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === "class") {
        callback();
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return observer;
};

function useGlobalMouse() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mouse;
};