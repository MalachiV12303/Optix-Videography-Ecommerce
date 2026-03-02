"use client";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "react-use-cart";
import { Camera, Lense, Aerial } from "@/app/lib/db/schema";
import { formatCurrency, isCamera, isLense } from "@/app/lib/utils";
import { ListBlobResultBlob } from "@vercel/blob";
import { useAddToCartModal } from "@/app/context/AddToCartModalContext";

export function Item({
  item,
  image,
}: {
  item: Camera | Lense | Aerial;
  image: ListBlobResultBlob | null;
}) {
  const params = new URLSearchParams();
  params.set("id", item.id.toString());
  if (isCamera(item)) {
    params.set("category", "cam");
  } else if (isLense(item)) {
    params.set("category", "len");
  } else {
    params.set("category", "aer");
  }

  const formattedValue = formatCurrency(item.price ?? 0);
  const { addItem, getItem } = useCart();
  const { open } = useAddToCartModal();
  const isInCart = !!getItem(item.id);

  return (
    <div className="group relative h-full flex flex-col md:flex-row gap-6 px-6 py-8 border-b border-foreground-muted bg-background/40 transition">
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
        <span className="hidden sm:block text-sm text-foreground-muted">
          ID: {item.id}
        </span>
        {!isLense(item) && (
          <p className="hidden md:block mt-4 text-base">
            {item.description}
          </p>
        )}
      </div>
      <div className="flex flex-col items-end justify-center gap-4">
        <span className="text-2xl lg:text-3xl">${formattedValue}</span>
        {isInCart ? (
          <Link
            href="/checkout"
            className="text-lg mt-8 sm:mt-0 px-4 py-2 rounded-lg bg-foreground text-background transition-all duration-300 hover:shadow-[0_0_8px_theme(colors.foreground)]"
          >
            View Cart
          </Link>
        ) : (
          <button
            className="text-lg mt-8 sm:mt-0 px-4 py-2 rounded-lg bg-primary text-foreground transition-all duration-300 hover:shadow-[0_0_8px_theme(colors.primary)]"
            onClick={() => {
              addItem({
                ...item,
                imageUrl: image?.url ?? null,
              });
              open({
                ...item,
                imageUrl: image?.url ?? null,
              });
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}