"use client";
import { HeroUIProvider } from "@heroui/react";
import { NuqsAdapter } from "nuqs/adapters/next";
import { CartProvider } from "react-use-cart";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children }: { children: React.ReactNode }) {
    // console.log("----providers.tsx----\n");
    // console.log("HeroUIProvider:", HeroUIProvider);
    // console.log("NextThemesProvider:", NextThemesProvider);
    // console.log("NuqsAdapter:", NuqsAdapter);
    // console.log("CartProvider:", CartProvider);
    // console.log("\n\n");
    return (
        <HeroUIProvider>
            <NextThemesProvider>
                <CartProvider>
                    <NuqsAdapter>
                        {children}
                    </NuqsAdapter>
                </CartProvider>
            </NextThemesProvider>
        </HeroUIProvider>
    )
};