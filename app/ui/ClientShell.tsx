"use client";
import Navigation from "./Navigation";
import { CartProvider } from "react-use-cart";
import { NuqsAdapter } from "nuqs/adapters/next";
import dynamic from "next/dynamic";
import BackgroundDrei from "./BackgroundDrei";

const HeroUIProvider = dynamic(
  () => import("@heroui/react").then(mod => mod.HeroUIProvider),
  { ssr: false }
);

export default function ClientShell({ children }: { children: React.ReactNode }) {
  // console.log("----providers.tsx----\n");
  // console.log("HeroUIProvider:", HeroUIProvider);
  // console.log("NuqsAdapter:", NuqsAdapter);
  // console.log("CartProvider:", CartProvider);
  // console.log("\n\n");
  return (
    <HeroUIProvider>
        <CartProvider>
          <NuqsAdapter>
            <BackgroundDrei />
            <Navigation />
            {children}
          </NuqsAdapter>
        </CartProvider>
    </HeroUIProvider>
  );
};