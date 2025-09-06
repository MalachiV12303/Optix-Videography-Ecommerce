"use client";
import { useState, useEffect } from "react";

const themes = ["light", "dark"] as const;
type Theme = (typeof themes)[number];

interface SVGProps {
    className?: string;
    width: number;
    height: number;
};

const LightIcon: React.FC<SVGProps> = ({ width, height, className }) => (
    <svg className={className} width={width} height={height} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="4 2 16 20">
      <path d="M15 16V18C15 18.9319 15 19.3978 14.8478 19.7654C14.6448 20.2554 14.2554 20.6448 13.7654 20.8478C13.3978 21 12.9319 21 12 21C11.0681 21 10.6022 21 10.2346 20.8478C9.74458 20.6448 9.35523 20.2554 9.15224 19.7654C9 19.3978 9 18.9319 9 18V16M5 10C5 6.13401 8.13401 3 12 3C15.866 3 19 6.13401 19 10C19 12.5463 17.6404 14.7751 15.6076 16H8.39241C6.35958 14.7751 5 12.5463 5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved && themes.includes(saved)) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const nextTheme = () => {
    const i = themes.indexOf(theme);
    setTheme(themes[(i + 1) % themes.length]);
  };

  return (
    <button
      onClick={nextTheme}
      className="rounded-full p-2"
    >
      <LightIcon width={25} height={25} className="text-foreground"/>
    </button>
  );
}
