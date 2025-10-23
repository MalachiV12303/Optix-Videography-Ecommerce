import React from 'react';
import Link from 'next/link';
import { useCart } from 'react-use-cart';
import { Aerial, Camera, Lense } from '@/app/lib/db/schema';
import { formatCurrency, isCamera, isLense } from '@/app/lib/utils';
import { ListBlobResultBlob } from '@vercel/blob';
import Image from 'next/image';

export function Item({ item, image }: { item: Camera | Lense | Aerial, image: ListBlobResultBlob | null }) {
    const params = new URLSearchParams()
    const formattedValue = formatCurrency(item.price ?? 0)
    const { addItem } = useCart()
    params.set("id", item.id.toString())

    return (
        <div className="px-6 py-8 group bg-background/40 lg:group-hover/list:opacity-70 lg:hover:!opacity-100 transition-all relative border-1 border-foreground-muted rounded-md flex flex-col md:flex-row max-w-full min-h-72 h-full md:h-auto">
            <Link href={`/item?${params}`} className="flex-1 aspect-square relative w-auto h-full">
                {image ?
                    // eslint-disable-next-line @next/next/no-img-element
                    <Image
                        fill
                        src={image.url}
                        alt={"Image of " + item.brand + " " + item.name}
                        className="object-contain" /> :
                    <div className="flex h-full items-center justify-center">
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='size-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />
                        </svg>
                    </div>
                }
            </Link>
            <div className="flex-2 lg:flex-3 mt-4 md:mt-0 md:px-4">
                <Link href={`/item?${params}`} className="block font-semibold text-lg sm:text-2xl hover:underline">{item.brand} {item.name} {isCamera(item) ? (item.type === 'DSLR' ? "Digital Camera" : "Mirrorless Camera") : null}</Link>
                <span className="hidden sm:block text-sm text-foreground-muted">ID: {item.id}</span>
                {!isLense(item) && (
                    <span className="hidden md:block text-base flex-1 mt-4">{item.description}</span>
                )}
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-4 mt-8 md:mt-0">
                <span className="text-2xl lg:text-3xl">${formattedValue}</span>
                <button className="px-4 py-2 bg-primary text-foreground rounded-full hover:bg-foreground hover:text-background transition" onClick={() => (addItem(item))}>
                    Add To Cart
                </button>
            </div>
        </div>
    )
}