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

export function CameraPage({ cam, image }: { cam: Camera, image: ListBlobResultBlob | null }) {
    const { addItem } = useCart()
    const [isOpen, setIsOpen] = React.useState(false);
    if (cam === undefined) {
        return notFound();
    }
   
    return (
        <section>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex flex-col gap-4">
                    <BackButton />
                    <div className='flex w-full lg:w-[300px] xl:w-[400px] border bg-white/80 border-foreground aspect-square items-center justify-center'>
                        {image ?
                            <Image
                                key={cam.id}
                                src={image.url}
                                alt='image'
                                width={400}
                                height={400}
                                style={{ width: '80%', height: 'auto' }}
                            /> :
                            <div className='flex h-full items-center justify-center'>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='size-6'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />
                                </svg>
                            </div>
                        }
                    </div>
                    <div className='flex gap-2 items-center justify-evenly'>
                        <p className='text-3xl font-bold'>{cam.price}</p>
                        <Button size='sm' onPress={() => {
                            addItem(cam);
                            setIsOpen(!isOpen);
                        }} className='text-sm text-nowrap border border-foreground bg-transparent text-foreground'>add to cart</Button>
                    </div>
                </div>

                <div className="flex-1 flex flex-col gap-8 items-center">
                    <div className='flex flex-col gap-2 text-nowrap w-full items-center md:items-start'>
                        <div className='text-3xl flex items-center gap-2 bg-foreground text-background px-4 py-2'>{cam.name} - {cam.brand}</div>
                        <div className='text-xl ml-4 flex gap-2 lowercase'>
                            {cam.megapixels} megapixel {cam.type} camera
                        </div>
                    </div>
                    <Accordion defaultExpandedKeys={['description','details','compat']} selectionMode={'multiple'} className='px-0' itemClasses={{ content: "py-4 px-4", title: "text-lg", indicator: 'text-background', trigger: "cursor-pointer px-4 border-b-1 border-foreground"}} fullWidth isCompact>
                        <AccordionItem key='description' aria-label='description' title='description'>
                            <p className='text-sm'>{cam.description}</p>
                        </AccordionItem>
                        <AccordionItem key='details' aria-label='details' title='details'>
                            <div>shutter speed: {cam.shutter}</div>
                            <div>resolution: {cam.res}p</div>
                        </AccordionItem>
                        <AccordionItem key='compat' aria-label='compatible with' title='compatible with'>
                            <div className='flex flex-wrap gap-2'>storage: {cam.storage?.map((sdtype, index) => (<div key={index}>{sdtype}</div>))}</div>
                            <div className='flex gap-2'>mount type: {cam.mount?.map((lentype, index) => {
                                const params= new URLSearchParams()
                                params.set('category','len')
                                params.set('mount', lentype)
                                return(
                                    <Link href={`/store?${params}`} key={index}>{lentype}</Link>
                                )
                            }
                            )}</div>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
    )
}