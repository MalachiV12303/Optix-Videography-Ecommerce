"use client";
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { Sparkles } from '@react-three/drei'

export default function BackgroundDrei() {
  const [foregroundColor, setForegroundColor] = useState<string>(getCssVar("--foreground"));
  const [, setPrimaryColor] = useState<string>(getCssVar("--primary"));

  useEffect(() => {
    const updateTheme = () => {
      setForegroundColor(getCssVar("--foreground"))
      setPrimaryColor(getCssVar("--primary"))
    };
    updateTheme();
    const observer = onThemeChange(updateTheme);
    return () => observer.disconnect();
  }, []);

  return (
    <Canvas
      gl={{ antialias: false }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        background: 'transparent',
        pointerEvents: "none",
        zIndex: -5,
      }}>
      <Suspense fallback={null}>
        <Sparkles count={75} color={foregroundColor} size={2} scale={10} />
        {/* <Sparkles count={75} color={primaryColor} size={1} scale={10} /> */}
      </Suspense>
    </Canvas>
  )
}

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

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