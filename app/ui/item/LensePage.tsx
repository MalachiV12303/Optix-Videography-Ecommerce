"use client";
import Image from 'next/image';
import React from 'react';
import { notFound } from 'next/navigation';
import { ListBlobResultBlob } from '@vercel/blob';
import { Lense } from '@/app/lib/db/schema';
import { CanonLogo, Checkmark, NikonLogo, PanasonicLogo, SonyLogo } from '../SvgLibrary';
import { useTypedCart } from '@/app/lib/cart/useTypedCart';
import { CartItemType } from '@/app/lib/types';

export function LensePage({ item, image }: { item: Lense, image: ListBlobResultBlob | null }) {
    const { addItem } = useTypedCart()
    const [isOpen, setIsOpen] = React.useState(false);
    if (item === undefined) {
        return notFound();
    }
    const category = "cam";
    const cartItem: CartItemType = {
        id: `${item.id}-${Date.now()}-${Math.random()}`,
        originalId: item.id,
        itemtype: category,
        brand: item.brand,
        name: item.name,
        price: item.price ?? 0,
        imageUrl: image?.url ?? null,
        protection: null,
        protectionPrice: 0,
      };

    return (
        <section className="h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] flex flex-col md:flex-row md:items-center">
                <div className="flex md:mr-4 gap-4 flex-1 min-h-48">
                    {/* <div className="hidden md:flex flex-col gap-2 w-[112px] h-full">
                        <span className="text-foreground pb-2"><ChevronUp className={"mx-auto"} width={25} height={10} /></span>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <span className="text-foreground pt-2"><ChevronDown className={"mx-auto"} width={25} height={10} /></span>
                    </div> */}
                    <div className="flex-1 p-8">
                        <div className="relative aspect-square">
                            {image ?
                                <Image
                                    fill
                                    src={image.url}
                                    alt={"Image of " + item.brand + " " + item.name}
                                    className="object-contain sm:p-24" /> :
                                <div className='flex h-full items-center justify-center'>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='size-6'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />
                                    </svg>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="bg-background flex flex-col p-4 border-1 border-foreground w-full md:w-[50%] lg:w-[40%]">
                    {(() => {
                        switch (item.brand) {
                            case 'Nikon':
                                return <NikonLogo width={35} height={35} />;
                            case 'Canon':
                                return <CanonLogo width={90} height={35} />;
                            case 'Panasonic':
                                return <PanasonicLogo width={100} height={35} />;
                            case 'Sony':
                                return <SonyLogo width={100} height={35} />;
                            default:
                                return <></>;
                        }
                    })()}
                    <div className="flex flex-col gap-2 text-nowrap w-full items-center md:items-start">
                        <span className="text-2xl font-semibold text-wrap">{item.brand} {item.name} {item.type === "DSLR" ? "Digital Camera" : "Mirrorless Camera"}</span>
                        <p className="text-foreground-muted">
                            ID#: {item.id}
                        </p>

                        <div className="text-sm my-4">
                            <span className="px-4 py-1 border-1 border-foreground rounded-full mr-2">In Stock: Online<Checkmark className={"ml-2 inline-block"} width={12} height={12} /></span>
                            <span className="px-4 py-1 border-1 border-foreground rounded-full">In Store Availablity</span>
                        </div>

                        <div className="flex w-full justify-between">
                            <p className="text-3xl font-bold">${item.price}</p>
                            <button onClick={() => {
                                addItem(cartItem);
                                setIsOpen(!isOpen);
                            }} className="rounded-full bg-primary/90 text-foreground px-4 py-2 hover:bg-foreground hover:text-background transition">Add To Cart</button>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-bold px-4 py-2 text-lg border-b-1 border-foreground">details</span>
                            <div className="py-2 px-4 text-wrap">
                                <span>minimum focal length: {item.minfl}mm</span>
                                <br />
                                <span>maximum focal length: {item.maxfl}mm</span>
                                <br />
                                <span>maximum aperture: {item.maxap}</span>
                            </div>
                            <span className="font-bold px-4 py-2 text-lg border-b-1 border-foreground">compatible with</span>
                            <div className='flex gap-2'>mount type: {item.mount?.map((lentype, index) => (<div key={index}>{lentype}</div>))}
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    )
};