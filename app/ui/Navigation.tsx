"use client";
import Link from "next/link";
import Searchbar from "@ui/Searchbar";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { defaultFilters, useFilters } from "../lib/searchParams";
import { getCategoryFilters } from "@lib/utils";

const Cart = dynamic(() => import("../Cart"), { ssr: false });

export default function Navigation() {
    return (
        <nav className="bg-background-muted text-foreground z-50 w-full sm:px-0 border-b border-foreground">
            <div className="h-20 container flex items-center gap-12 w-full">
                <Link href="/" className="text-3xl sm:text-4xl font-mono">
                    OPTIX
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    <span className="hidden"></span>
                    <Cart />
                </div>
            </div>
            <div className="relative border-background">
                <div className="flex gap-6 md:gap-12 container items-end">
                    <CategoryMenu label="Cameras" category="cam" params={["brand","res","type"]} />
                    <CategoryMenu label="Lenses" category="len" params={["brand","type","mount"]} />
                    <CategoryMenu label="Aerial" category="aer" params={["brand", "type", "distance", "altitude"]} />
                    <span className="ml-auto">
                        <Searchbar />
                    </span>
                </div>
            </div>
        </nav>
    );
}

function CategoryMenu({
    label,
    category,
    params,
}: {
    label: string;
    category: string;
    params: string[];
}) {
    const router = useRouter();
    const [, setFilters] = useFilters();

    const filters = getCategoryFilters(category).filter(f =>
        params.includes(f.param)
    );
    const handleClick = (filter: string, value: string) => {
        router.push("/");
        setTimeout(() => {
            setFilters({
                category,
                ...defaultFilters,
                [filter]: [value],
            });

            document
                .getElementById("storeContent")
                ?.scrollIntoView({ behavior: "smooth" });
        }, 150);
    };
    return (
        <div className="group uppercase">
            <div className="h-12 flex items-center">
                <span className="cursor-pointer underline decoration-transparent hover:decoration-foreground underline-offset-4 transition-all">
                    {label}
                </span>
            </div>
            <div className="absolute left-0 top-full w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                <div className="bg-background-muted border-t border-foreground shadow-lg">
                    <div className="container py-6">
                        <div className="flex gap-6 md:gap-12">
                            {filters.map((item) => (
                                <div key={item.param} className="flex flex-col gap-4">
                                    <h2 className="font-semibold">
                                        {item.param.toUpperCase()}
                                    </h2>
                                    {item.values.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleClick(item.param, opt.value)}
                                            className="text-sm hover:underline text-left"
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};