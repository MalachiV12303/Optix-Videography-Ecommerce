"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@ui/ThemeToggle";
import Searchbar from "@ui/Searchbar";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("../Cart"), { ssr: false });

export default function Navigation() {
    const pathname = usePathname();
    const getMarketLabel = () => {
        if (pathname === "/") return ".store";
        if (pathname.startsWith("/item")) return ".item";
        if (pathname.startsWith("/checkout")) return ".checkout";
        return ".store";
    };

    return (
        <nav className="bg-background sm:bg-transparent fixed top-0 z-50 w-full px-4 sm:px-0">
            <div className="h-20 sm:h-24 container flex items-center justify-between">
                <Link
                    href="/"
                    className="text-4xl font-mono underline underline-offset-8 decoration-1"
                >
                    GLEAM
                    <span className="text-primary text-3xl">
                        {getMarketLabel()}
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <Searchbar />
                    <Cart />
                    <span className="">
                        <ThemeToggle />
                    </span>
                </div>
            </div>
        </nav>
    );
};