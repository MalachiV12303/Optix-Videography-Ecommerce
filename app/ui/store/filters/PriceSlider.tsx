"use client";
import { useFilters } from "@/app/lib/searchParams";
import { useDebouncedCallback } from "use-debounce";
import { useEffect, useRef, useState } from "react";

const MIN = 0;
const MAX = 3000;
const STEP = 50;

export function PriceSlider() {
  const [{ price }, setFilters] = useFilters();
  const [minVal, setMinVal] = useState(price[0]);
  const [maxVal, setMaxVal] = useState(price[1]);
  const [activeThumb, setActiveThumb] = useState<"min" | "max" | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const updatePrice = useDebouncedCallback((min: number, max: number) => {
    setFilters({ price: [min, max] });
  }, 200);

  useEffect(() => {
    setMinVal(price[0]);
    setMaxVal(price[1]);
  }, [price]);

  const minPercent = ((minVal - MIN) / (MAX - MIN)) * 100;
  const maxPercent = ((maxVal - MIN) / (MAX - MIN)) * 100;
  const handlePointerMove = (e: PointerEvent) => {
    if (!trackRef.current || !activeThumb) return;

    const rect = trackRef.current.getBoundingClientRect();
    const clientX = e.clientX; // PointerEvent always has clientX
    let percent = ((clientX - rect.left) / rect.width) * 100;
    let value = Math.round(((percent / 100) * (MAX - MIN) + MIN) / STEP) * STEP;
    value = Math.min(Math.max(value, MIN), MAX);

    if (activeThumb === "min") {
      const newMin = Math.min(value, maxVal - STEP);
      setMinVal(newMin);
      updatePrice(newMin, maxVal);
    } else if (activeThumb === "max") {
      const newMax = Math.max(value, minVal + STEP);
      setMaxVal(newMax);
      updatePrice(minVal, newMax);
    }
  };

  const handlePointerUp = () => setActiveThumb(null);
  useEffect(() => {
    if (typeof window === "undefined") return; // ensure client-side only
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  });

  return (
    <div className="max-w-md px-4 mt-4 select-none">
      <div className="flex justify-between text-sm mb-2">
        <span>${minVal}</span>
        <span>${maxVal}</span>
      </div>

      <div ref={trackRef} className="relative h-6">
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full" />
        <div
          className="absolute top-1/2 -translate-y-1/2 h-1 bg-foreground rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full cursor-pointer shadow transition-transform hover:scale-110 z-10"
          style={{ left: `${minPercent}%`, transform: "translate(-50%, -50%)" }}
          onPointerDown={() => setActiveThumb("min")}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full cursor-pointer shadow transition-transform hover:scale-110 z-10"
          style={{ left: `${maxPercent}%`, transform: "translate(-50%, -50%)" }}
          onPointerDown={() => setActiveThumb("max")}
        />
      </div>
    </div>
  );
};