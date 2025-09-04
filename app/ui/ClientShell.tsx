"use client";
import Navigation from "./Navigation";
import { CartProvider } from "react-use-cart";
import { NuqsAdapter } from "nuqs/adapters/next";
import dynamic from "next/dynamic";
import BackgroundDrei from "./BackgroundDrei";

// Dynamically import NextUIProvider client-only
const NextUIProvider = dynamic(
  () => import("@nextui-org/react").then(mod => mod.NextUIProvider),
  { ssr: false }
);

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
        <CartProvider>
          <NuqsAdapter>
            <BackgroundDrei />
            <Navigation />
            {children}
          </NuqsAdapter>
        </CartProvider>
    </NextUIProvider>
  );
}
