"use client";
import CartItem from "@/app/CartItem";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import { formatCurrency } from "@/app/lib/utils";

export function CheckoutCart() {
    const { items, isEmpty, totalItems } = useCart();
    const total = items.reduce((sum, item) => {
        const base = Math.round(Number(item.price ?? 0) * 100);
        const protection = Math.round(Number(item.protectionPrice ?? 0) * 100);
        return sum + base + protection;
    }, 0) / 100;
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <div className="bg-background relative flex flex-col max-h-[80dvh] h-full border border-foreground px-2">
            <p className="py-4 px-4 text-lg">Order summary ({totalItems} {totalItems === 1 ? "item" : "items"})</p>
            <div className="overflow-auto no-scrollbar flex-1 flex flex-col divide-foreground">
                {!isEmpty ? items.map((it, index) => (
                    <CartItem key={index} item={it}></CartItem>
                )) :
                    <div className="h-48 w-full flex justify-center items-center col-span-3 sm:col-span-3 xl:col-span-3">no items in your cart...</div>}
            </div>
            <div className="px-4 py-2 text-xl w-full flex border-t border-foreground">
                <span>subtotal:</span>
                <span className="ml-auto font-bold">${isClient ? formatCurrency(total) : null}</span>
            </div>
            <div className="px-4 py-2 text-xl w-full flex border-t border-foreground">
                <span className="font-bold">order total:</span>
                <span className="ml-auto font-bold">${isClient ? formatCurrency(total * 1.07) : null}</span>
            </div>
        </div>
    )
};