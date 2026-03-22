"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { CartItemType } from "@lib/types";

type ContextType = {
  open: (item: CartItemType) => void;
  close: () => void;
  item: CartItemType | null;
};

const AddToCartModalContext = createContext<ContextType | null>(null);

export function AddToCartProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<CartItemType | null>(null);
  const open = (item: CartItemType) => setItem(item);
  const close = () => setItem(null);

  return (
    <AddToCartModalContext.Provider value={{ open, close, item }}>
      {children}
    </AddToCartModalContext.Provider>
  );
}

export function useAddToCartModal() {
  const ctx = useContext(AddToCartModalContext);
  if (!ctx) throw new Error("Must be used inside AddToCartProvider");
  return ctx;
};