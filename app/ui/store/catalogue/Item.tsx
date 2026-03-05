"use client";
import Link from "next/link";
import Image from "next/image";
import { Camera, Lense, Aerial } from "@/app/lib/db/schema";
import { formatCurrency, isCamera, isLense } from "@/app/lib/utils";
import { ListBlobResultBlob } from "@vercel/blob";
import { useAddToCartModal } from "@/app/context/AddToCartModalContext";
import { Plus } from "lucide-react";
import { CartItemType } from "@/app/lib/types";
import { useTypedCart } from "@/app/lib/cart/useTypedCart";
import { createCartItem } from "@/app/lib/cart/createCartItem";

export function Item({
  item,
  image,
}: {
  item: Camera | Lense | Aerial;
  image: ListBlobResultBlob | null;
}) {
  const { open } = useAddToCartModal();
  const { items } = useTypedCart();
  const isInCart = items.some(
    (cartItem) => cartItem.originalId === String(item.id)
  );
  const basePrice = item.price ?? 0;
  const formattedValue = formatCurrency(basePrice);
  const params = new URLSearchParams();
  params.set("id", item.id.toString());
  const category = isCamera(item)
    ? "cam"
    : isLense(item)
      ? "len"
      : "aer";
  params.set("category", category);

  return (
    <div className="group relative h-full flex flex-col gap-6 px-2 sm:px-6 py-8 border-b border-foreground-muted bg-background/40 transition">
      <Link
        href={`/item?${params}`}
        className="relative w-full md:w-64 aspect-square shrink-0"
      >
        {image ? (
          <Image
            src={image.url}
            alt={`Image of ${item.brand} ${item.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 256px"
            className="object-contain p-4"
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-foreground-muted">
          </div>
        )}
      </Link>
      <div className="flex-1">
        <Link
          href={`/item?${params}`}
          className="block text-lg sm:text-2xl font-semibold hover:underline"
        >
          {item.brand} {item.name}{" "}
          {isCamera(item)
            ? item.type === "DSLR"
              ? "Digital Camera"
              : "Mirrorless Camera"
            : null}
        </Link>
        <p className="text-2xl mt-2">${formattedValue}</p>
        {/* {!isLense(item) && (
          <p className="hidden md:block mt-4 text-base">
            {item.description}
          </p>
        )} */}
      </div>
      <div className="flex flex-col items-start gap-4">
        {isInCart ? (
          <div className="w-full text-background flex items-center mt-8 sm:mt-0">
            <Link
              scroll
              href="/checkout"
              className="text-nowrap flex-1 text-center bg-primary hover:bg-primary-muted sm:text-lg px-4 py-2 transition-all duration-300"
            >
              View in Cart
            </Link>
            <button
              aria-label="Add another item"
              className="bg-primary hover:bg-primary-muted border-l border-background text-background h-full w-10 flex items-center justify-center text-2xl font-semibold transition-all duration-300 active:scale-95"
              onClick={() => {
                open(
                  createCartItem({
                    id: item.id,
                    itemtype: category,
                    brand: item.brand,
                    name: item.name,
                    price: item.price ?? 0,
                    imageUrl: image?.url ?? null,
                    protection: null,
                    protectionPrice: 0,
                  })
                );
              }}
            >
              <Plus size={20} />
            </button>
          </div>
        ) : (
          <button
            className="sm:text-lg w-full bg-primary hover:bg-primary-muted text-background mt-8 sm:mt-0 px-4 py-2 transition-all duration-300"
            onClick={() => {
              open(
                createCartItem({
                  id: item.id,
                  itemtype: category,
                  brand: item.brand,
                  name: item.name,
                  price: item.price ?? 0,
                  imageUrl: image?.url ?? null,
                  protection: null,
                  protectionPrice: 0,
                })
              );
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};