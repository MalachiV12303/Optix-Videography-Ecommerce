"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CustomButtonProps {
  children: React.ReactNode;
  className?: string;
  text?: string;
}

export default function CustomButton({
  children,
  className = "",
  text = "Coming Soon",
}: CustomButtonProps) {
  const [popup, setPopup] = useState<{
    x: number;
    y: number;
    visible: boolean;
  }>({
    x: 0,
    y: 0,
    visible: false,
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPopup({
      x: e.clientX,
      y: e.clientY,
      visible: true,
    });
    setTimeout(() => {
      setPopup((prev) => ({
        ...prev,
        visible: false,
      }));
    }, 1500);
  };

  return (
    <>
      <button onClick={handleClick} className={className}>
        {children}
      </button>
      <AnimatePresence>
        {popup.visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed pointer-events-none z-50 px-4 py-2 border border-white/20 bg-background text-foreground text-sm font-medium shadow-xl"
            style={{
              left: popup.x,
              top: popup.y - 55,
              transform: "translateX(-50%)",
            }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}