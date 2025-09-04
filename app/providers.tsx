"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next";
import { CartProvider } from 'react-use-cart'

console.log("----providers.tsx----\n");
console.log("NextUIProvider:", NextUIProvider);
console.log("NextThemesProvider:", NextThemesProvider);
console.log("NuqsAdapter:", NuqsAdapter);
console.log("CartProvider:", CartProvider);
console.log("\n\n");

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <NextThemesProvider>
                <CartProvider>
                    <NuqsAdapter>
                        {children}
                    </NuqsAdapter>
                </CartProvider>
            </NextThemesProvider>
        </NextUIProvider>
    )
}