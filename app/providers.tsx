"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next";
import { CartProvider } from 'react-use-cart'

export function Providers({ children }: { children: React.ReactNode }) {
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