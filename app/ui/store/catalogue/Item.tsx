import Link from "next/link";
import Image from "next/image";
import { useCart } from "react-use-cart";
import { Camera, Lense, Aerial } from "@/app/lib/db/schema";
import { formatCurrency, isCamera, isLense } from "@/app/lib/utils";
import { ListBlobResultBlob } from "@vercel/blob";

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
    params.set("category", "aer"); // if you support aerial
  }

  const formattedValue = formatCurrency(item.price ?? 0);
  const { addItem } = useCart();

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z"
              />
            </svg>
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
      <div className="flex flex-col items-center justify-center gap-4">
        <span className="text-2xl lg:text-3xl">${formattedValue}</span>

        <button
          className="mt-8 sm:mt-0 px-4 py-2 rounded-full bg-primary text-foreground hover:bg-foreground hover:text-background transition"
          onClick={() => addItem(item)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};