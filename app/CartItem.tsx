import Link from "next/link";
import Image from "next/image";
import { Item, useCart } from "react-use-cart";
import { Trash2 } from "lucide-react";
import { formatCurrency, getItemCat } from "./lib/utils";

export default function CartItem({ item }: { item: Item }) {
    const { updateItemQuantity } = useCart()
    const params = new URLSearchParams()
    params.set("id", item.id.toString())
    params.set("itemtype", getItemCat(item))

    return (
        <div className="w-full px-2 py-4 flex items-start gap-4 border-b border-foreground">
            {item.imageUrl && (
                <div className="relative w-20 h-20 shrink-0">
                    <Image
                        src={item.imageUrl}
                        alt={`image of ${item.name} ${item.type}`}
                        fill
                        sizes="128px"
                        className="object-contain"
                    />
                </div>
            )}
            <div className="flex-1 pt-1">
                <Link className="text-base uppercase hover:underline" href={`/item?${params}`}>{item.brand} - {item.name}</Link>
            </div>
            <div className="flex flex-col items-end h-full">
                <div className="flex flex-col justify-between h-full">
                    <div>
                        {(() => {
                            const quantity = item.quantity ?? 1
                            const baseTotal = item.price * quantity
                            const protectionTotal = (item.protectionPrice ?? 0) * quantity
                            const grandTotal = baseTotal + protectionTotal

                            return (
                                <>
                                    <p className="font-bold text-end">
                                        ${formatCurrency(grandTotal)}
                                    </p>

                                    {item.protection && (
                                        <p className="text-xs text-end text-foreground-muted">
                                            {item.protection === "2yr"
                                                ? "2 Year Protection"
                                                : "3 Year Protection"}
                                        </p>
                                    )}
                                </>
                            )
                        })()}
                    </div>
                    <button className="text-sm text-foreground underline flex items-center hover:text-foreground-muted justify-end" onClick={() => (updateItemQuantity(item.id, item.quantity ? item.quantity - 1 : 0))}><Trash2 className="size-4 inline mr-1" />Remove</button>
                </div>
            </div>
        </div>
    )
};