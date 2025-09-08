"use client";
import Image from 'next/image';
import React from 'react';
import { useCart } from 'react-use-cart';
import { notFound } from 'next/navigation';
import { ListBlobResultBlob } from '@vercel/blob';
import { Lense } from '@/app/lib/db/schema';
import { CanonLogo, Checkmark, ChevronDown, ChevronUp, NikonLogo, PanasonicLogo, SonyLogo } from '../SvgLibrary';

export function LensePage({ len, image }: { len: Lense, image: ListBlobResultBlob | null }) {
    const { addItem } = useCart()
    const [isOpen, setIsOpen] = React.useState(false);
    if (len === undefined) {
        return notFound();
    }
    // return (
    //     <section className='flex min-h-dvh mx-auto max-w-[1200px] items-center px-4 sm:px-12 xl:px-0'>
    //         <div className='pt-[80px] pb-12 lg:pt-0 sm:pb-0 flex flex-col md:flex-row gap-4 lg:gap-12 items-center w-full'>
    //             <div className='flex flex-col gap-4' id='leftPanel'>
    //                 <BackButton />
    //                 <div className='flex w-full lg:w-[300px] xl:w-[400px] border bg-white border-foreground aspect-square items-center justify-center'>
    //                     {image ?
    //                         <Image
    //                             key={len.id}
    //                             src={image.url}
    //                             alt='image'
    //                             width={400}
    //                             height={400}
    //                             style={{ width: '80%', height: 'auto' }}
    //                         /> :
    //                         <div className='flex h-full items-center justify-center'>
    //                             <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='size-6'>
    //                                 <path strokeLinecap='round' strokeLinejoin='round' d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />
    //                             </svg>
    //                         </div>
    //                     }
    //                 </div>
    //                 <div className='flex gap-2 items-center justify-evenly'>
    //                     <p className='text-3xl font-bold'>{len.price}</p>
    //                     <Button size='sm' onPress={() => {
    //                         addItem(len);
    //                         setIsOpen(!isOpen);
    //                     }} className='text-sm text-nowrap border border-foreground bg-transparent text-foreground'>add to cart</Button>
    //                 </div>
    //             </div>
    //             <div id='rightPanel' className='flex-1 flex flex-col gap-8 items-center '>
    //                 <div className='flex flex-col gap-2 text-nowrap w-full items-center md:items-start'>
    //                     <div className='text-xl lg:text-2xl flex items-center gap-2 bg-foreground text-background px-4 py-2 text-wrap'>{len.name} - {len.brand}</div>
    //                 </div>
    //                 <Accordion defaultExpandedKeys={['description']} selectionMode={'multiple'} className='px-0' itemClasses={{ content: 'py-4 px-4 bg-background bg-opacity-80', title: 'text-background', indicator: 'text-background', trigger: 'my-1 bg-foreground text-background px-4' }} isCompact>
    //                     <AccordionItem key='description' aria-label='description' title='description'>
    //                         <p className='text-sm'>minimum fl: {len.minfl}mm</p>
    //                         <p className='text-sm'>maximum fl: {len.maxfl}mm</p>
    //                         <p className='text-sm'>maximum aperture: {len.maxap}</p>
    //                     </AccordionItem>
    //                     <AccordionItem key='compat' aria-label='compatible with' title='compatible with'>
    //                         <div className='flex gap-2'>mount type: {len.mount?.map((lentype, index) => (<div key={index}>{lentype}</div>))}</div>
    //                     </AccordionItem>
    //                 </Accordion>
    //             </div>
    //         </div>
    //     </section>
    // )

    return (
        <section className="mt-20 sm:mt-24 py-16">
            <div className="flex flex-col md:flex-row">
                <div className="flex md:mr-4 gap-4 flex-1 min-h-48">
                    <div className="hidden md:flex flex-col gap-2 w-[112px] h-full">
                        <span className="text-foreground pb-2"><ChevronUp className={"mx-auto"} width={25} height={10} /></span>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <div className="border-1 border-foreground aspect-square w-full"></div>
                        <span className="text-foreground pt-2"><ChevronDown className={"mx-auto"} width={25} height={10} /></span>
                    </div>
                    <div className="flex-1 p-8">
                        <div className="relative aspect-square">
                            {image ?
                                <Image
                                    fill
                                    src={image.url}
                                    alt={"Image of " + len.brand + " " + len.name}
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

                <div className="bg-background flex flex-col p-4 border-1 border-foreground w-full md:w-[50%] lg:w-[40%]">
                    {(() => {
                        switch (len.brand) {
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
                        <span className="text-2xl font-semibold text-wrap">{len.brand} {len.name} {len.type === "DSLR" ? "Digital Camera" : "Mirrorless Camera"}</span>
                        <p className="text-foreground-muted">
                            ID#: {len.id}
                        </p>

                        <div className="text-sm my-4">
                            <span className="px-4 py-1 border-1 border-foreground rounded-full mr-2">In Stock: Online<Checkmark className={"ml-2 inline-block"} width={12} height={12} /></span>
                            <span className="px-4 py-1 border-1 border-foreground rounded-full">In Store Availablity</span>
                        </div>

                        <div className="flex w-full justify-between">
                            <p className="text-3xl font-bold">${len.price}</p>
                            <button onClick={() => {
                                addItem(len);
                                setIsOpen(!isOpen);
                            }} className="rounded-full bg-primary/90 text-foreground px-4 py-2 hover:bg-foreground hover:text-background transition">Add To Cart</button>
                        </div>

                        <div className="flex flex-col">
                            <span className="font-bold px-4 py-2 text-lg border-b-1 border-foreground">details</span>
                            <div className="py-2 px-4 text-wrap">
                                <span>minimum focal length: {len.minfl}mm</span>
                                <br />
                                <span>maximum focal length: {len.maxfl}mm</span>
                                <br />
                                <span>maximum aperture: {len.maxap}</span>
                            </div>
                            <span className="font-bold px-4 py-2 text-lg border-b-1 border-foreground">compatible with</span>
                            <div className='flex gap-2'>mount type: {len.mount?.map((lentype, index) => (<div key={index}>{lentype}</div>))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}