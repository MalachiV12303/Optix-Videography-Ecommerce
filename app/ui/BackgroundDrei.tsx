"use client";
import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useState } from 'react'
import { Sparkles } from '@react-three/drei'

export default function BackgroundDrei() {
  const [foregroundColor, setForegroundColor] = useState<string>(getCssVar("--foreground"));
  const [primaryColor, setPrimaryColor] = useState<string>(getCssVar("--primary"));

  // Sync color with theme (CSS vars)
  useEffect(() => {
    const updateTheme = () => {
      setForegroundColor(getCssVar("--foreground"))
      setPrimaryColor(getCssVar("--primary"))
    };
    // Initial color
    updateTheme();
    // Watch for theme changes
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
        <Sparkles count={150} color={foregroundColor} size={2} scale={10} />
        <Sparkles count={75} color={primaryColor} size={1} scale={10} />
      </Suspense>
    </Canvas>
  )
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