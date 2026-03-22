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
        <nav className="bg-transparent text-foreground z-50 w-full sm:px-0">
            <div className="h-20 sm:h-24 container flex items-center gap-12 w-full">
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
            {/* <div className="flex gap-6 container pb-4">
                <CategoryMenu
                    label="Cameras"
                    category="cam"
                    items={[
                        { label: "DSLR Cameras", type: "DSLR" },
                        { label: "Mirrorless Cameras", type: "mirrorless" },
                        { label: "Point & Shoot", type: "pointshoot" },
                        { label: "Cinema Cameras", type: "cinema" },
                    ]}
                />
                <CategoryMenu
                    label="Lenses"
                    category="len"
                    items={[
                        { label: "Wide Angle", type: "wide" },
                        { label: "Telephoto", type: "telephoto" },
                        { label: "Prime", type: "prime" },
                        { label: "Macro", type: "macro" },
                    ]}
                />
                <CategoryMenu
                    label="Aerial"
                    category="aer"
                    items={[
                        { label: "Camera Drones", type: "drone" },
                        { label: "FPV Drones", type: "fpv" },
                        { label: "Accessories", type: "aerialacc" },
                    ]}
                />
                <Link
                    href={{ pathname: "/", query: { category: "acc" } }}
                    className="underline decoration-transparent hover:decoration-foreground underline-offset-4 transition-all"
                >
                    Accessories
                </Link>
            </div> */}
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
    items: { label: string; type: string }[];
}) {
    return (
        <div className="relative group">
            <span className="cursor-pointer underline decoration-transparent hover:decoration-foreground underline-offset-4 transition-all">
                {label}
            </span>
            <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-background border border-border rounded-xl shadow-lg p-3 min-w-[220px]">
                    <div className="flex flex-col gap-2">
                        {items.map((item) => (
                            <Link
                                key={item.type}
                                href={{
                                    pathname: "/",
                                    query: {
                                        category,
                                        type: item.type,
                                    },
                                }}
                                className="px-3 py-2 rounded-md hover:bg-muted transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};