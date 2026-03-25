"use client";
import { useEffect, useState } from "react";
import { useTypedCart } from "@lib/cart/useTypedCart";
import { formatCurrency } from "@lib/utils";
import CheckoutItem from "@ui/checkout/CheckoutItem";

export default function Page() {
    //render cart information without ssr errors
    const [isClient, setIsClient] = useState(false)
    const { items, isEmpty, totalItems } = useTypedCart();
    const total = items.reduce((sum, item) => {
        const base = Math.round(Number(item.price ?? 0) * 100);
        const protection = Math.round(Number(item.protectionPrice ?? 0) * 100);
        return sum + base + protection;
    }, 0) / 100;
    useEffect(() => {
        setIsClient(true)
    }, []);
    return (
        <>
            <h1 className="text-2xl text-center md:text-start uppercase font-semibold border-b border-foreground py-4">Cart ({totalItems} {totalItems === 1 ? "item" : "items"})</h1>
            <section className="mt-8 flex xl:flex-row flex-col">
                <div className="xl:w-2/3">
                    {!isEmpty ? items.map((item, index) => (
                        <CheckoutItem key={index} item={item} />
                    )) :
                        <div className="flex flex-col gap-4 w-full min-h-72 px-8 py-6 border-b border-foreground">
                                <p className="font-semibold uppercase hover:underline text-2xl text-end md:text-start">
                                    Empty Cart
                                </p>
                                <p className="text-foreground-muted">Looks like you haven't added anything to your cart yet.</p>
                        </div>
                    }
                </div>
                <div className="min-h-[60dvh] xl:w-1/3">
                    <div className="py-2 sticky top-12 flex flex-col border border-foreground px-6">
                        <p className="py-4 text-xl font-semibold tracking-wider uppercase border-b border-foreground">Order Summary</p>
                        <div className="w-full flex mt-4">
                            <span>Subtotal ( {totalItems} {totalItems === 1 ? "item" : "items"} ) </span>
                            <span className="ml-auto font-semibold">${isClient ? formatCurrency(total) : null}</span>
                        </div>
                        <div className="w-full flex mt-4">
                            <span>Est. shipping</span>
                            <span className="ml-auto font-semibold">FREE Standard Shipping</span>
                        </div>
                        <div className="w-full flex my-4">
                            <span>Est. Taxes & Fees</span>
                            <span className="ml-auto font-semibold">${isClient ? formatCurrency(total * 0.07) : null}</span>
                        </div>

                        <div className="py-4 text-xl w-full flex border-y border-foreground">
                            <span className="font-semibold">Estimated Total</span>
                            <span className="ml-auto font-semibold">${isClient ? formatCurrency(total * 1.07) : null}</span>
                        </div>

                        <div className="my-4 text-lg w-full flex">
                            <input
                                type="text"
                                id="promo-code"
                                placeholder="Enter promo code"
                                className="flex-1 px-4 py-2 bg-background border border-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                            />
                            <button className="ml-2 px-4 bg-primary hover:bg-primary-muted text-background transition-all">Apply</button>
                        </div>

                        <div className="my-4 text-lg w-full flex flex-col gap-4">
                            <button className="w-full py-4 bg-primary hover:bg-primary-muted text-background transition-all">Checkout</button>
                            <button className="bg-background w-full py-4 hover:text-foreground-muted hover:border-foreground-muted transition-all text-foreground border border-foreground">Pay with PayPal</button>
                            <button className="bg-background w-full py-4 hover:text-foreground-muted hover:border-foreground-muted transition-all text-foreground border border-foreground">Pay with Crypto</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};