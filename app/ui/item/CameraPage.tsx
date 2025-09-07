"use client";
import BackButton from './BackButton';
import Image from 'next/image';
import React from 'react';
import { useCart } from 'react-use-cart';
import { Camera } from '@/app/lib/db/schema';
import { notFound } from 'next/navigation';
import { ListBlobResultBlob } from '@vercel/blob';
import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import Link from 'next/link';
import { CanonLogo, NikonLogo } from '../SvgLibrary';

export function CameraPage({ cam, image }: { cam: Camera, image: ListBlobResultBlob | null }) {
    const { addItem } = useCart()
    const [isOpen, setIsOpen] = React.useState(false);
    if (cam === undefined) {
        return notFound();
    }
    {/* <BackButton /> */ }
    return (
        <section className="mt-20 sm:mt-24 pt-24">
            <div className="flex flex-col md:flex-row">
                <div className="flex md:mr-4 gap-4 flex-1 min-h-48">
                    <div className="hidden md:flex flex-col gap-2 w-[112px] h-full">
                        <p>arrow</p>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <p>arrow</p>
                    </div>
                    <div className="flex-1 p-8">
                        <div className="relative aspect-square">
                            {image ?
                                <Image
                                    fill
                                    src={image.url}
                                    alt={"Image of " + cam.brand + " " + cam.name}
                                    className="object-contain" /> :
                                <div className='flex h-full items-center justify-center'>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='size-6'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />
                                    </svg>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-col p-4 border-1 border-foreground w-full md:w-[50%] lg:w-[40%]">
                    {(() => {
                        switch (cam.brand) {
                            case 'Nikon':
                                return <NikonLogo width={35} height={35} />;
                            case 'Canon':
                                return <CanonLogo width={90} height={35} />;
                            default:
                                return <></>;
                        }
                    })()}
                    <div className="flex flex-col gap-2 text-nowrap w-full items-center md:items-start">
                        <p className="text-2xl font-semibold">{cam.brand} {cam.name} {cam.type === "DSLR" ? "Digital Camera" : "Mirrorless Camera"}</p>
                        <p className="text-foreground-muted">
                            ID#: {cam.id}
                        </p>

                        <div className="text-sm my-4">
                            <span className="px-4 py-1 border-1 border-foreground rounded-full mr-2">In Stock: Online</span>
                            <span className="px-4 py-1 border-1 border-foreground rounded-full">In Store Availablity</span>
                        </div>

                        <div className="flex w-full justify-between">
                            <p className="text-3xl font-bold">${cam.price}</p>
                            <button onClick={() => {
                                addItem(cam);
                                setIsOpen(!isOpen);
                            }} className="rounded-full bg-primary/90 text-foreground px-4 py-2 hover:bg-foreground hover:text-background transition">Add To Cart</button>
                        </div>

                        <Accordion defaultExpandedKeys={['description', 'details', 'compat']} selectionMode={'multiple'} className='px-0' itemClasses={{ content: "py-4 px-4", title: "text-lg", indicator: 'text-background', trigger: "cursor-pointer px-4 border-b-1 border-foreground" }} fullWidth isCompact>
                            <AccordionItem key='description' aria-label='description' title='description'>
                                <p className='text-sm text-wrap'>{cam.description}</p>
                            </AccordionItem>
                            <AccordionItem key='details' aria-label='details' title='details'>
                                <div>shutter speed: {cam.shutter}</div>
                                <div>resolution: {cam.res}p</div>
                            </AccordionItem>
                            <AccordionItem key='compat' aria-label='compatible with' title='compatible with'>
                                <div className='flex flex-wrap gap-2'>storage: {cam.storage?.map((sdtype, index) => (<div key={index}>{sdtype}</div>))}</div>
                                <div className='flex gap-2'>mount type: {cam.mount?.map((lentype, index) => {
                                    const params = new URLSearchParams()
                                    params.set('category', 'len')
                                    params.set('mount', lentype)
                                    return (
                                        <Link href={`/store?${params}`} key={index}>{lentype}</Link>
                                    )
                                }
                                )}</div>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}