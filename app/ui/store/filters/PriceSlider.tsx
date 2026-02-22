"use client";
import { useRef, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type PriceSliderProps = {
  min: number;
  max: number;
};
const MIN_GAP = 400;

export default function PriceSlider({ min, max }: PriceSliderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trackRef = useRef<HTMLDivElement>(null);
  const priceParam = searchParams.get("price");
  let paramMin = min;
  let paramMax = max;
  
  if (priceParam) {
    const [pMin, pMax] = priceParam.split(",").map(Number);
    if (!isNaN(pMin)) paramMin = pMin;
    if (!isNaN(pMax)) paramMax = pMax;
  }
  const [value, setValue] = useState<[number, number]>([
    paramMin,
    paramMax,
  ]);

  const [activeThumb, setActiveThumb] = useState<"min" | "max" | null>(null);
  const percent = (val: number) => ((val - min) / (max - min)) * 100;
  const updateURL = (newValue: [number, number]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(
      "price",
      `${Math.round(newValue[0])},${Math.round(newValue[1])}`
    );
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const updateValue = (clientX: number) => {
    if (!trackRef.current || !activeThumb) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    let newValue = min + ratio * (max - min);
    newValue = Math.round(newValue / 50) * 50; // snap to 50
    newValue = Math.min(max, Math.max(min, newValue));

    let updated: [number, number];

    if (activeThumb === "min") {
      const clamped = Math.min(newValue, value[1] - MIN_GAP);
      updated = [clamped, value[1]];
    } else {
      const clamped = Math.max(newValue, value[0] + MIN_GAP);
      updated = [value[0], clamped];
    }
    setValue(updated);
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      updateValue(e.clientX);
    };

    const handlePointerUp = () => {
      setActiveThumb(null);
      updateURL(value);
    };

    if (activeThumb) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [activeThumb, value]);

  return (
    <div className="w-full py-6 px-4">
      <div className="relative mb-6">
        <div
          className="absolute -top-3 -translate-x-1/2 text-sm font-medium text-white"
          style={{ left: `${percent(value[0])}%` }}
        >
          ${Math.round(value[0])}
        </div>
        <div
          className="absolute -top-3 -translate-x-1/2 text-sm font-medium text-white"
          style={{ left: `${percent(value[1])}%` }}
        >
          ${Math.round(value[1])}
        </div>
      </div>

      <div ref={trackRef} className="relative h-1">
        <div
          className="absolute h-1 rounded-full bg-white"
          style={{
            left: `${percent(value[0])}%`,
            width: `${percent(value[1]) - percent(value[0])}%`,
          }}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white shadow-md"
          style={{ left: `${percent(value[0])}%` }}
          onPointerDown={() => setActiveThumb("min")}
        />
        <div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-white shadow-md"
          style={{ left: `${percent(value[1])}%` }}
          onPointerDown={() => setActiveThumb("max")}
        />
      </div>
    </div>
  )
};