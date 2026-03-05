"use client";
import { useEffect, useState } from "react";
import { BulbIcon } from "./SvgLibrary";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  // read theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const resolvedTheme: Theme =
      saved === "light" || saved === "dark" ? saved : "dark";

    setTheme(resolvedTheme);
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, []);

  // apply theme changes
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        p-2
        transition-all
        bg-primary
        hover:bg-primary-muted
        text-background
      "
    >
      <BulbIcon width={25} height={25} />
    </button>
  );
};