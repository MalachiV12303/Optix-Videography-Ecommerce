"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Camera, Lense, Aerial } from "@/app/lib/db/schema";

type ItemType = (Camera | Lense | Aerial) & {
  imageUrl?: string | null;
};

type ContextType = {
  open: (item: ItemType) => void;
  close: () => void;
  item: ItemType | null;
};

const AddToCartModalContext = createContext<ContextType | null>(null);

export function AddToCartProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<ItemType | null>(null);
  const open = (item: ItemType) => setItem(item);
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