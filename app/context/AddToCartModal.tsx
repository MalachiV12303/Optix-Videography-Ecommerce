"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAddToCartModal } from "@/app/context/AddToCartModalContext";
import { formatCurrency, getItemCat } from "@/app/lib/utils";
import { Checkbox, CheckboxGroup } from "@heroui/react";

export default function AddToCartModal() {
  const { item, close } = useAddToCartModal();
  useEffect(() => {
    if (!item) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [item, close]);
  if (!item) return null;

  const params = new URLSearchParams();
  params.set("id", item.id.toString());
  params.set("itemtype", getItemCat(item));
  const protection2yr = (item.price ?? 0) * 0.1;
  const protection3yr = (item.price ?? 0) * 0.15;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={close}
      />
      <div className="border-foreground relative z-10 w-[90%] max-w-[45rem] min-h-[45%] rounded-lg bg-background px-8 py-8 shadow-2xl animate-in fade-in zoom-in-95">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-xl hover:scale-125 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold">
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
            <Link className="text-nowrap hidden sm:block h-min text-lg px-4 py-2 rounded-lg bg-foreground hover:bg-foreground-muted text-background transition-all duration-300" href="/checkout">
              View Cart
            </Link>
          </div>
        </div>

        <div className="border-t border-foreground pt-4 space-y-3">
          <p className="font-medium">Add Protection Plan?</p>
          <CheckboxGroup
            aria-label={"protection plans"}
            classNames={{
              base: `pt-2 pb-4`,
              wrapper: ``,
            }}
          >
            <Checkbox classNames={{ wrapper: "before:border before:border-foreground" }} radius="none" key={"2yr"} value={"2yr"}>
              2 Year Protection — ${formatCurrency(protection2yr)}
            </Checkbox>
            <Checkbox classNames={{ wrapper: "before:border before:border-foreground" }} radius="none" key={"3yr"} value={"3yr"}>
              3 Year Protection — ${formatCurrency(protection3yr)}
            </Checkbox>
          </CheckboxGroup>
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
}