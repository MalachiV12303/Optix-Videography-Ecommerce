"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAddToCartModal } from "@/app/context/AddToCartModalContext";
import { formatCurrency, getItemCat } from "@/app/lib/utils";
import { useCart } from "react-use-cart";

export default function AddToCartModal() {
  const { item, close } = useAddToCartModal();
  const { updateItem } = useCart();
  const [selectedPlan, setSelectedPlan] = useState<"2yr" | "3yr" | null>(null);
  useEffect(() => {
    if (!item) return;
    setSelectedPlan(item.protection ?? null);
  }, [item]);

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [item, close]);

  if (!item) return null;

  const params = new URLSearchParams();
  params.set("id", item.id.toString());
  params.set("itemtype", getItemCat(item));

  const basePrice = item.price ?? 0;
  const protection2yr = basePrice * 0.1;
  const protection3yr = basePrice * 0.15;
  const handleSelect = (plan: "2yr" | "3yr") => {
    const isSamePlan = selectedPlan === plan;

    if (isSamePlan) {
      setSelectedPlan(null);
      updateItem(item.id, {
        protection: null,
        protectionPrice: 0,
      });
      return;
    }
    const price = plan === "2yr" ? protection2yr : protection3yr;
    setSelectedPlan(plan);
    updateItem(item.id, {
      protection: plan,
      protectionPrice: price,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      />
      <div className="border-foreground relative z-10 w-[90%] max-w-[45rem] rounded-lg bg-background px-8 py-8 shadow-2xl animate-in fade-in zoom-in-95">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-xl hover:scale-125 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl border-b border-foreground pb-2">
          1 Item Added to Cart
        </h2>

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
            <Link className="text-xl hover:underline" onClick={close} href={`/item?${params}`}>{item.brand} - {item.name}</Link>
            <p className="text-lg font-medium">
              ${formatCurrency(item.price ?? 0)}
            </p>
          </div>

          <div className="flex-1 flex justify-end">
            <Link onClick={close} className="text-nowrap hidden sm:block h-min text-lg px-4 py-2 bg-primary hover:bg-primary-muted text-background transition-all duration-300" href="/checkout">
              View Cart
            </Link>
          </div>
        </div>

        <div className="border-t border-foreground pt-4">
          <p className="font-medium mb-4">Add Protection Plan?</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleSelect("2yr")}
              className={`border p-4 text-left transition-all duration-300
                ${selectedPlan === "2yr"
                  ? "border-primary bg-primary/10"
                  : "border-foreground hover:border-primary"
                }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">2 Year Protection</span>
                <span>${formatCurrency(protection2yr)}</span>
              </div>
            </button>

            <button
              onClick={() => handleSelect("3yr")}
              className={`border p-4 text-left transition-all duration-300
                ${selectedPlan === "3yr"
                  ? "border-primary bg-primary/10"
                  : "border-foreground hover:border-primary"
                }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">3 Year Protection</span>
                <span>${formatCurrency(protection3yr)}</span>
              </div>
            </button>
          </div>
        </div>

        {/* <div className="border-t pt-4 space-y-3">
          <p className="font-medium">Commonly paired items</p>
          <div className="font-medium text-lg p-6">still working on this feature</div>
        </div> */}

        <Link className="text-nowrap mt-8 block sm:hidden h-min text-lg text-center py-2 rounded-lg bg-foreground hover:bg-foreground-muted text-background transition-all duration-300" href="/checkout">
          View Cart & Checkout
        </Link>
      </div>
    </div>
  );
};