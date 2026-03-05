"use client";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { searchParams, useFilters } from "../../lib/searchParams";

export default function StoreButton({
  buttonText,
  category,
  imgSrc,
}: {
  buttonText: string;
  category: string;
  imgSrc: string;
}) {
  const [, setCategory] = useQueryState(
    "category",
    searchParams.category.withOptions({ shallow: false })
  );
  const [, setFilters] = useFilters();
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={() => {
        setFilters({});
        setCategory(category);
        scrollToSection("storeContent");
      }}
      className="
        relative w-full flex-1 overflow-hidden
        aspect-[6/1]
        md:aspect-[16/5]
        lg:aspect-[6/1]
      "
    >
      <Image
        src={imgSrc}
        alt={buttonText}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
        priority={false}
      />
      <div className="absolute inset-0 bg-black/30" />
      <span className="relative z-10 flex h-full w-full items-center justify-center font-mono text-2xl sm:text-3xl font-bold uppercase text-white">
        {buttonText}
      </span>
    </button>
  );
};