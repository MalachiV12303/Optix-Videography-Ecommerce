"use client";
import { useState, useEffect } from "react";
import { BulbIcon } from "./SvgLibrary";

const themes = ["light", "dark"] as const;
type Theme = (typeof themes)[number];

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
      <BulbIcon width={25} height={25} className="text-foreground"/>
    </button>
  );
}
