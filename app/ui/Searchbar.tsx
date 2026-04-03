"use client";
import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFilters } from "@lib/searchParams";
import { filterMap } from "@lib/utils";

type Suggestion =
    | { type: "product"; label: string; id: string; category: string }
    | { type: "filter"; label: string; display: string; category: string; param: string };
const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, "");
const MAX_SUGGESTIONS = 11;
const categoryText: Record<string, string> = {
    cam: "Camera",
    len: "Lense",
    aer: "Aerial",
};
const categoryLabel = (category: string, param: string) => {
    const map: Record<string, string> = {
        cam: "Camera",
        len: "Lense",
        aer: "Aerial",
    };
    const paramMap: Record<string, string> = {
        type: "Types",
        brand: "Brands",
        res: "Resolutions",
        shutter: "Shutter Speeds",
        mgp: "Megapixels",
        mount: "Mounts",
        maxap: "Max Aperture",
        minfl: "Min Focal Length",
        maxfl: "Max Focal Length",
    };
    return `${map[category] ?? category} ${paramMap[param] ?? param}`;
};

export default function Searchbar() {
    const router = useRouter();
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
        const seen = new Set<string>();
        const results: Suggestion[] = [];

        for (const { category, param, values } of filterMap) {
            for (const value of values) {
                if (!normalize(value).includes(q)) continue;

                const key = `${value}-${category}-${param}`;
                if (seen.has(key)) continue;
                seen.add(key);

                results.push({
                    type: "filter",
                    label: value,
                    display: categoryLabel(category, param),
                    category,
                    param,
                });
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
        router.push("/");
        setTimeout(() => {
            setFilters({
                category: s.category,
                [s.param]: [String(s.label)],
            } as any);
            document
                .getElementById("storeContent")
                ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
    };

    return (
        <div className="relative hidden sm:flex flex-col min-w-96 h-12">
            <div className="flex gap-2 items-center bg-background-muted px-2 h-full">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="size-5"
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
                    placeholder="search..."
                    className="py-2 placeholder:text-foreground placeholder:tracking-wide uppercase bg-transparent outline-none w-full"
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 150)}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className={`absolute top-full w-full bg-background-muted border-b border-x border-foreground shadow-lg z-50 overflow-hidden transition-all duration-200 ease-out
                    ${focused
                    ? "max-h-[80vh] opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
                }`}>
                {focused && (
                    suggestions.length === 0 ? (
                        <div className="pointer-events-none border-t border-foreground px-3 py-3 text-sm text-foreground-muted">
                            No items match your search...
                        </div>
                    ) : (
                        suggestions.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => handleSelect(s)}
                                className="group w-full text-left px-3 py-3 flex justify-between items-center border-t border-foreground"
                            >
                                <span className="group-hover:underline mr-4">{s.label}</span>

                                <span className="text-sm text-foreground-muted ">
                                    {s.type === "filter"
                                        ? "in " + s.display
                                        : categoryText[s.category] ?? s.category}
                                </span>
                            </button>
                        ))
                    )
                )}
            </div>
        </div>
    );
};