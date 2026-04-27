"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAddToCartModal } from "@/app/context/AddToCartModalContext";
import { formatCurrency } from "@lib/utils";
import { useTypedCart } from "@lib/cart/useTypedCart";
import { createCartItem } from "@lib/cart/createCartItem";

export default function AddToCartModal() {
  const { item, close } = useAddToCartModal();
  const { addItem } = useTypedCart();
  const [selectedPlan, setSelectedPlan] = useState<"2yr" | "3yr" | null>(null);

  useEffect(() => {
    if (!item) return;
    setSelectedPlan(item.protection ?? null);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item]);

  if (!item) return null;

  const basePrice = item.price ?? 0;
  const protection2yr = basePrice * 0.1;
  const protection3yr = basePrice * 0.15;

  function handleSelect(plan: "2yr" | "3yr") {
    setSelectedPlan(prev => (prev === plan ? null : plan));
  }

  const handleClose = () => {
    if (!item) return;

    const protectionPrice =
      selectedPlan === "2yr"
        ? protection2yr
        : selectedPlan === "3yr"
        ? protection3yr
        : 0;

    const newItem = createCartItem({
      id: item.originalId,
      itemtype: item.itemtype,
      brand: item.brand,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      protection: selectedPlan,
      protectionPrice,
    });

    addItem(newItem);
    close();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-none" />
      <div className="border-foreground relative z-10 pointer-events-auto w-[90%] max-w-[45rem] rounded-lg bg-background px-8 py-8 shadow-2xl animate-in fade-in zoom-in-95">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-xl transition active:scale-90"
          type="button"
        >
          ✕
        </button>

        <h2 className="text-2xl border-b border-foreground pb-2">1 Item Added to Cart</h2>

        <div className="flex flex-row mt-4">
          {item.imageUrl && (
            <div className="relative w-32 h-32 mr-4">
              <Image
                src={item.imageUrl}
                alt={`${item.brand} ${item.name}`}
                fill
                sizes="256px"
                className="object-contain p-2"
              />
            </div>
          )}
          <div>
            <p className="text-xl">{item.brand} - {item.name}</p>
            <p className="text-lg font-medium">${formatCurrency(item.price ?? 0)}</p>
          </div>

          <div className="flex-1 flex justify-end">
            <Link onClick={handleClose} className="text-nowrap hidden sm:block h-min text-lg px-4 py-2 bg-primary hover:bg-primary-muted active:bg-primary-muted text-background transition-all duration-200 active:scale-95" href="/checkout">
              View Cart
            </Link>
          </div>
        </div>

        <div className="border-t border-foreground pt-4">
          <p className="font-medium mb-4">Add Protection Plan?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onPointerUp={() => handleSelect("2yr")}
              className={`border border-foreground p-4 text-left transition-all duration-150 active:scale-[0.97] active:bg-primary-muted ${
                selectedPlan === "2yr"
                  ? "border-primary bg-primary text-background hover:bg-primary-muted"
                  : "border-foreground hover:bg-primary hover:border-transparent hover:text-background"
              }`}
              type="button"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">2 Year Protection</span>
                <span>${formatCurrency(protection2yr)}</span>
              </div>
            </button>
            
            <button
              onPointerUp={() => handleSelect("3yr")}
              className={`border border-foreground p-4 text-left transition-all duration-150 active:scale-[0.97] active:bg-primary-muted ${
                selectedPlan === "3yr"
                  ? "border-primary bg-primary text-background hover:bg-primary-muted"
                  : "border-foreground hover:bg-primary hover:border-transparent hover:text-background"
              }`}
              type="button"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">3 Year Protection</span>
                <span>${formatCurrency(protection3yr)}</span>
              </div>
            </button>
          </div>
        </div>

        <Link
          onClick={handleClose}
          className="text-nowrap mt-8 block sm:hidden h-min text-lg text-center py-2 bg-primary hover:bg-primary-muted active:bg-primary-muted text-background transition-all duration-200 active:scale-95"
          href="/checkout"
        >
          View Cart & Checkout
        </Link>
      </div>
    </div>
  );
};