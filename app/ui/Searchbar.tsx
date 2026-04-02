"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQueryStates } from "nuqs";
import { searchParams, useFilters } from "@lib/searchParams";
import { filtermap } from "@lib/utils";

const normalize = (str: string) =>
    str.toLowerCase().replace(/\s+/g, "");

const MAX_SUGGESTIONS = 8;

type Suggestion =
    | { type: "product"; label: string; id: string; category: string }
    | { type: "filter"; label: string; key: string };

export default function Searchbar() {
    const router = useRouter();

    const [params, setParams] = useQueryStates(searchParams);

    const [search, setSearch] = useState("");
    const [focused, setFocused] = useState(false);
    const [products, setProducts] = useState<Suggestion[]>([]);

    useEffect(() => {
        if (!search) {
            setProducts([]);
            return;
        }

        const fetchProducts = async () => {
            const res = await fetch(`/api/search?q=${search}`);
            const data = await res.json();

            setProducts(
                data.map((item: any) => ({
                    type: "product",
                    label: item.name,
                    id: item.id,
                    category: item.category,
                }))
            );
        };

        fetchProducts();
    }, [search]);

    const filterSuggestions = useMemo(() => {
        if (!search) return [];

        const q = normalize(search);
        const results: Suggestion[] = [];

        for (const [key, values] of filtermap.entries()) {
            for (const value of values) {
                if (normalize(value).includes(q)) {
                    results.push({
                        type: "filter",
                        label: value,
                        key,
                    });
                }
            }
        }

        return results;
    }, [search]);

    const suggestions = useMemo(() => {
        return [...products, ...filterSuggestions].slice(0, MAX_SUGGESTIONS);
    }, [products, filterSuggestions]);

    const [, setFilters] = useFilters();

    const handleSelect = (s: Suggestion) => {
        if (s.type === "product") {
            const params = new URLSearchParams();
            params.set("id", s.id);
            params.set("category", s.category);

            router.push(`/item?${params.toString()}`);
            return;
        }

        const keyMap: Record<string, string> = {
            cameratypes: "type",
            camerabrands: "brand",
            lensetypes: "type",
            lensebrands: "brand",
            aerialtypes: "type",
            aerialbrands: "brand",
            resolutions: "res",
            shutterspeeds: "shutter",
            megapixels: "mgp",
            apertures: "maxap",
            focallengths: "minfl",
            mount: "mount",
        };

        const filterKey = keyMap[s.key];
        if (!filterKey) return;

        router.push("/");

        setTimeout(() => {
            setFilters({
                category: filterKey.startsWith("cam")
                    ? "cam"
                    : filterKey.startsWith("len")
                        ? "len"
                        : filterKey.startsWith("aer")
                            ? "aer"
                            : undefined,

                [filterKey]: [String(s.label)],
            } as any);

            document
                .getElementById("storeContent")
                ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
    };

    return (
        <div className="relative hidden sm:flex flex-col">
            <div className="flex gap-2 items-center border-b border-foreground">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>

                <input
                    spellCheck={false}
                    value={search}
                    placeholder="search for products..."
                    className="py-2 placeholder:text-foreground bg-transparent outline-none w-full"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {focused && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-background border border-foreground/20 rounded-md shadow-lg z-50">
                    {suggestions.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => handleSelect(s)}
                            className="w-full text-left px-3 py-2 hover:bg-foreground/10 flex justify-between"
                        >
                            <span>{s.label}</span>
                            <span className="text-xs opacity-60">
                                {s.type === "product" ? "item" : "filter"}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}