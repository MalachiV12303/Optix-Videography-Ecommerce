"use client";
import Link from "next/link";
import ThemeToggle from "@ui/ThemeToggle";
import Searchbar from "@ui/Searchbar";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("../Cart"), { ssr: false });

export default function Navigation() {
    // const pathname = usePathname();
    // const getMarketLabel = () => {
    //     if (pathname === "/") return ".store";
    //     if (pathname.startsWith("/item")) return ".item";
    //     if (pathname.startsWith("/checkout")) return ".checkout";
    //     return ".store";
    // };
    return (
        <nav className="bg-transparent text-foreground absolute top-0 z-50 w-full px-4 sm:px-0">
            <div className="h-20 sm:h-24 container flex items-center gap-12 w-full ">
                <Link href="/" className="text-4xl font-mono">
                    GLEAM
                    {/* <span className="text-3xl">
                        {getMarketLabel()}
                    </span> */}
                </Link>
                <Searchbar />
                <div className="ml-auto flex items-center gap-4">
                    <span className="hidden">
                        <ThemeToggle />
                    </span>
                    <Cart />
                </div>
            </div>
        </nav>
    );
};