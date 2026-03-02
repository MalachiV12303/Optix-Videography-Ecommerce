"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import {
    Badge,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@heroui/react";
import CartItem from "./CartItem";
import { CartIcon } from "./ui/SvgLibrary";

export default function Cart() {
    const { items, isEmpty, totalItems, cartTotal } = useCart()
    const [totalQuantity, setTotalQuantity] = useState(0)
    useEffect(() => {
        setTotalQuantity(totalItems)
    }, [totalItems])

    return (
        <Popover placement={"bottom-end"} shouldBlockScroll={true} classNames={{
            trigger: ["min-w-0 rounded-full p-2"],
            content: ["rounded-lg border border-foreground bg-background text-foreground text-lg lg:text-sm px-4 py-6", "flex flex-row", "h-[70dvh] w-[80dvw] sm:w-[60dvw] xl:w-[25dvw]"],
        }}>
            <Badge isInvisible={isEmpty} content={totalQuantity} className="text-sm min-w-6 tracking-tight bg-foreground text-background pr-px pl-px sm:pl-0 pt-px">
                <PopoverTrigger>
                    <div className="flex items-center justify-center bg-foreground text-background">
                        <CartIcon width={25} height={25} />
                    </div>
                </PopoverTrigger>
            </Badge>
            <PopoverContent>
                <div className="h-full w-full flex flex-col">
                    <p className="text-lg font-medium">Your cart: {totalQuantity} items</p>
                    <div className="my-4 border-y flex flex-col border-foreground items-start w-full overflow-y-auto no-scrollbar flex-1">
                        {!isEmpty ? items.map((it, index) => (
                            <CartItem key={index} item={it} />
                        )) :
                            <div className="text-lg w-full flex h-full my-auto items-center justify-center">
                                <p>no items in your cart...</p>
                            </div>
                        }
                    </div>
                    <Link
                        href="/checkout"
                        className="w-full text-center text-lg px-4 py-2 rounded-lg bg-foreground text-background transition-all duration-300 hover:shadow-[0_0_8px_theme(colors.foreground)]"
                    >
                        View Cart & Checkout
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    )
};