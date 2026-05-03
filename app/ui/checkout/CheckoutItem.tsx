import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartItemType } from "@lib/types";
import { formatCurrency } from "@lib/utils";
import { useTypedCart } from "@lib/cart/useTypedCart";

export default function CheckoutItem({ item }: { item: CartItemType }) {
    const { updateItemQuantity } = useTypedCart();
    const href = `/item?id=${item.originalId}&itemtype=${item.itemtype}`;
    const quantity = item.quantity ?? 1;
    return (
        <div className="w-full min-h-72 px-10 py-8 lg:py-6 flex items-start gap-8 border-b border-foreground">
            <div className="md:p-4">
                {item.imageUrl && (
                    <div className="relative w-24 h-32 md:w-48 md:h-48 shrink-0">
                        <Image
                            src={item.imageUrl}
                            alt={`image of ${item.name} ${item.type}`}
                            fill
                            sizes="256px"
                            className="object-contain"
                        />
                    </div>
                )}
            </div>

            <div className="flex-1 flex flex-col gap-4 items-end md:items-start">
                <Link className="font-semibold uppercase hover:underline text-xl lg:text-2xl text-end md:text-start" href={href}>
                    {item.brand} - {item.name}
                </Link>
                <p className="text-foreground-muted">{item.description}</p>
                <p className="text-foreground-muted">Quantity: {quantity}</p>
                <span className="border border-foreground px-4 py-2 w-min text-nowrap">
                    {item.protection === "2yr"
                        ? "2 Year Protection"
                        : item.protection === "3yr"
                            ? "3 Year Protection"
                            : "No Protection Plan"}
                </span>

                <div className="flex flex-col h-full md:hidden">
                    <div>
                        {(() => {
                            const baseTotal = item.price * quantity
                            const protectionTotal = (item.protectionPrice ?? 0) * quantity
                            const grandTotal = baseTotal + protectionTotal

                            return (
                                <>
                                    <p className="text-2xl">
                                        ${formatCurrency(grandTotal)}
                                    </p>
                                </>
                            )
                        })()}
                    </div>
                    <div className="flex-1 flex flex-col items-end">
                        <button className="mt-8 w-min text-lg text-foreground underline flex items-center hover:text-primary transition-all justify-end" onClick={() => (updateItemQuantity(item.id, item.quantity ? item.quantity - 1 : 0))}><Trash2 className="size-4 inline mr-1" />Remove</button>
                    </div>
                </div>
            </div>

            <div className="hidden md:flex flex-col items-end h-full">
                <div className="flex flex-col h-full items-end">
                    <div>
                        {(() => {
                            const baseTotal = item.price * quantity
                            const protectionTotal = (item.protectionPrice ?? 0) * quantity
                            const grandTotal = baseTotal + protectionTotal

                            return (
                                <>
                                    <p className="text-end text-2xl">
                                        ${formatCurrency(grandTotal)}
                                    </p>
                                </>
                            )
                        })()}
                    </div>
                    <p className="mt-2">In Stock</p>
                    <div className="flex-1 flex flex-col justify-end">
                        <button className="mt-8 w-min text-lg text-foreground underline flex items-center hover:text-primary transition-all justify-end" onClick={() => (updateItemQuantity(item.id, item.quantity ? item.quantity - 1 : 0))}><Trash2 className="size-4 inline mr-1" />Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
};