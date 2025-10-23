"use client";
import React from "react";
import { useQueryState } from "nuqs";
import { searchParams, useFilters } from "../../lib/searchParams";
import Image from "next/image";

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
        searchParams.category.withOptions({
            shallow: false,
        })
    );
    const [, setFilters] = useFilters();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <button
            className="cursor-pointer flex items-center justify-center relative min-h-16 flex-1 transition duration-300 ease-in-out hover:grayscale-0 lg:grayscale rounded-md overflow-hidden"
            onClick={() => {
                setFilters({});
                setCategory(category);
                scrollToSection("storeContent");
            }}
        >
            <Image alt={buttonText} src={imgSrc} className="object-cover" fill />
            {/* Overlay (optional, for readability) */}
            <div className="absolute inset-0 bg-black/30" />
            <p className="font-mono font-bold uppercase text-3xl relative z-10 flex items-center justify-center text-white">
                {buttonText}
            </p>
        </button>
    );
}
