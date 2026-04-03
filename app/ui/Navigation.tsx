"use client";
import Link from "next/link";
import Searchbar from "@ui/Searchbar";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { defaultFilters, useFilters } from "../lib/searchParams";

const Cart = dynamic(() => import("../Cart"), { ssr: false });

export default function Navigation() {
    return (
        <nav className="bg-background-muted text-foreground z-50 w-full sm:px-0 border-b border-foreground">
            <div className="h-20 sm:h-24 container flex items-center gap-12 w-full">
                <Link href="/" className="text-4xl font-mono">
                    GLEAM
                </Link>
                <div className="ml-auto flex items-center gap-4">
                    <span className="hidden">
                        {/* <ThemeToggle /> */}
                    </span>
                    <Cart />
                </div>
            </div>
            <div className="relative border-background">
                <div className="flex gap-6 md:gap-12 container items-end">
                    <CategoryMenu
                        label="Cameras"
                        category="cam"
                        items={[
                            {
                                label: "BRAND",
                                filter: "brand",
                                options: [
                                    { label: "Canon", value: "Canon" },
                                    { label: "Nikon", value: "Nikon" },
                                    { label: "Sony", value: "Sony" },
                                    { label: "Panasonic", value: "Panasonic" },
                                ],
                            },
                            {
                                label: "RESOLUTION",
                                filter: "res",
                                options: [
                                    { label: "1080p", value: "1080" },
                                    { label: "4K 2160p", value: "2160" },
                                    { label: "8K 6144p", value: "6144" },
                                ],
                            },
                            {
                                label: "TYPE",
                                filter: "type",
                                options: [
                                    { label: "DSLR Cameras", value: "DSLR" },
                                    { label: "Mirrorless Cameras", value: "Mirrorless" },
                                ],
                            },
                        ]}
                    />
                    <CategoryMenu
                        label="Lenses"
                        category="len"
                        items={[
                            {
                                label: "BRAND",
                                filter: "brand",
                                options: [
                                    { label: "Canon", value: "Canon" },
                                    { label: "Nikon", value: "Nikon" },
                                    { label: "Sony", value: "Sony" },
                                    { label: "Panasonic", value: "Panasonic" },
                                    { label: "Sigma", value: "Sigma" },
                                    { label: "Tamron", value: "Tamron" },
                                ],
                            },
                            {
                                label: "TYPE",
                                filter: "type",
                                options: [
                                    { label: "Telephoto Zoom", value: "Telephoto Zoom" },
                                    { label: "Telephoto Prime", value: "Telephoto Prime" },
                                    { label: "Standard Zoom", value: "Standard Zoom" },
                                    { label: "Standard Prime", value: "Standard Prime" },
                                    { label: "Wide Angle Prime", value: "Wide Angle Prime" },
                                ],
                            },
                            {
                                label: "MOUNT",
                                filter: "mount",
                                options: [
                                    { label: "Canon EF", value: "Canon EF" },
                                    { label: "Nikon DX", value: "Nikon DX" },
                                    { label: "Nikon FX", value: "Nikon FX" },
                                    { label: "Sony E-Mount", value: "Sony E-Mount" },
                                    { label: "Leica L-Mount", value: "Leica L-Mount" },
                                ],
                            },
                        ]}
                    />
                    <CategoryMenu
                        label="Aerial"
                        category="aer"
                        items={[
                            {
                                label: "BRAND",
                                filter: "brand",
                                options: [
                                    { label: "DJI", value: "DJI" },
                                    { label: "Snaptain", value: "Snaptain" },
                                    { label: "Contixo", value: "Contixo" },
                                ],
                            },
                        ]}
                    />
                    <span className="ml-auto">
                        <Searchbar />
                    </span>
                    {/* <Link
                    href={{ pathname: "/", query: { category: "acc" } }}
                    className="underline decoration-transparent hover:decoration-foreground underline-offset-4 transition-all"
                >
                    Accessories
                </Link> */}
                </div>
            </div>
        </nav>
    );
};

function CategoryMenu({
    label,
    category,
    items,
}: {
    label: string;
    category: string;
    items: {
        label: string;
        filter: string;
        options: { label: string; value: string }[];
    }[];
}) {
    const router = useRouter();
    const [, setFilters] = useFilters();

    const handleClick = (filter: string, value: string | number) => {
        router.push("/");
        setTimeout(() => {
            setFilters({
                category,
                ...defaultFilters,
                [filter]: [String(value)],
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
                            {items.map((item) => (
                                <div key={item.label} className="flex flex-col gap-4">
                                    <h2 className="font-semibold">{item.label}</h2>
                                    {item.options.map((opt) => (
                                        <button
                                            key={opt.value}
                                            onClick={() => handleClick(item.filter, opt.value)}
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