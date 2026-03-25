"use client";
import Link from "next/link";
import CartItem from "@ui/CartItem";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CartIcon } from "@ui/SvgLibrary";
import { formatCurrency } from "@lib/utils";
import {
    Badge,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@heroui/react";
import { useTypedCart } from "@lib/cart/useTypedCart";

export default function Cart() {
    const [isOpen, setIsOpen] = useState(false);
    const { items, isEmpty } = useTypedCart();
    const totalQuantity = items.reduce(
        (sum, item) => sum + (item.quantity ?? 1),
        0
    );
    const total = items.reduce((sum, item) => {
        const base = Math.round(Number(item.price ?? 0) * 100);
        const protection = Math.round(Number(item.protectionPrice ?? 0) * 100);
        return sum + base + protection;
    }, 0) / 100;
    const pathname = usePathname();
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);
    return (
        <Popover
            isOpen={isOpen}
            onOpenChange={()=>{
                setIsOpen(!isOpen);
                console.log(items)
            }}
            placement={"bottom-end"}
            shouldBlockScroll={true}
            classNames={{
                trigger: ["min-w-0 p-2 bg-primary hover:bg-primary-muted transition-all text-background"],
                content: ["border border-foreground bg-background text-foreground text-lg lg:text-sm px-4 py-6", "flex flex-row", "h-[80dvh] w-[80dvw] sm:w-[60dvw] md:w-[50dvw] lg:w-[40dvw] 2xl:w-[30dvw]"],
            }}>
            <Badge isInvisible={isEmpty} content={totalQuantity} className="text-sm min-w-6 tracking-tight border border-foreground bg-background text-foreground pr-px pl-px sm:pl-0 pt-px">
                <PopoverTrigger>
                    <div>
                        <CartIcon width={25} height={25} />
                    </div>
                </PopoverTrigger>
            </Badge>
            <PopoverContent>
                <div className="h-full w-full flex flex-col">
                    <p className="text-lg font-medium pl-2">Your cart: {totalQuantity} items</p>
                    <div className="my-4 border-y flex flex-col border-foreground items-start w-full overflow-y-auto no-scrollbar flex-1">
                        {!isEmpty ? items.map((item, index) => (
                            <CartItem key={index} item={item} />
                        )) :
                            <div className="text-lg w-full flex h-full my-auto items-center justify-center">
                                <p>no items in your cart...</p>
                            </div>
                        }
                    </div>
                    <p className="text-sm sm:text-base mb-4 pl-2"> Estimated Subtotal: {formatCurrency(total)} </p>
                    <Link
                        href="/checkout"
                        className="w-full text-center text-lg px-4 py-2 bg-primary hover:bg-primary-muted transition-all text-background"
                    >
                        View Cart & Checkout
                    </Link>
                </div>
            </PopoverContent>
        </Popover>
    )
};