import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from 'react-use-cart';
import { Button } from '@nextui-org/react';
import { Camera, Lense } from '@/app/lib/db/schema';
import { formatCurrency, isCamera, isLense, transition } from '@/app/lib/utils';
import { motion } from 'motion/react';
import { ListBlobResultBlob } from '@vercel/blob';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

export function StoreItem({ item, image }: { item: Camera | Lense, image: ListBlobResultBlob | null }) {
    const params = new URLSearchParams()
    params.set('id', item.id.toString())
    const formattedValue = formatCurrency(item.price ?? 0)
    const { addItem } = useCart()
    const { theme } = useTheme()
    const [, setThemeColor] = useState('')

    useEffect(() => {
        setThemeColor(theme ? theme : '')
    }, [theme])
    if (isCamera(item))
        return Camera(item)
    else if (isLense(item))
        return Lense(item)
    else {
        return <div>unknown item type</div>;
    }

    //camera on store page
    function Camera(item: Camera) {
        return (
            <div
                className={'text-sm drop-shadow-sm hover:drop-shadow-primary drop-shadow-foreground relative text-foreground bg-background border-b border-foreground flex flex-col px-4 py-2 items-center max-w-full h-full'}>
                <Link href={`/item?${params}`}
                    className='flex flex-col h-full'>
                    <div id='image' className='aspect-square px-4 py-4 border-b border-foreground flex justify-center items-center'>
                        {image ?
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                key={item.id}
                                src={image.url}
                                alt={item.name}
                                className='w-full'
                            /> :
                            <div className='flex h-full items-center justify-center'>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='size-6'>
                                    <path strokeLinecap='round' strokeLinejoin='round' d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />
                                </svg>
                            </div>
                        }
                    </div>
                    <div id='itemInfo' className='mb-4'>
                        <div className='text-sm uppercase font-bold text-start'>{item.brand}</div>
                        <div className='mt-2 text-lg text-start '>{item.name}</div>
                        <div className='text-base sm:text-base flex flex-col'>
                            <p>{item.megapixels} megapixels</p> 
                            <p>{item.type === 'DSLR' ? 'digital' : 'mirrorless'}</p>
                        </div>
                    </div>
                    <div id='itemPrice' className='mt-2 flex-1 flex flex-col justify-end font-bold text-lg'>
                        {formattedValue}
                    </div>
                </Link>
                <div className='absolute right-0 bottom-0 h-[50px] w-[50px] flex items-center justify-center'>
                    <motion.div
                        transition={transition}
                        whileHover={{
                            scale: 1.5,
                        }}
                        className='flex items-center justify-center text-foreground' >
                        <Button variant='light' className='min-w-min px-0 h-min background-transparent' onPress={() => (addItem(item))}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </Button>
                    </motion.div>
                </div>
            </div>
        )
    }
    //lense on store page
    function Lense(item: Lense) {
        params.set('category', 'len')
        return (
            <>
                <div
                    className={clsx('text-sm shadow-md relative text-foreground bg-background border-b border-foreground flex flex-col px-4 py-2 items-center max-w-full h-full', { 'shadow-white/10': theme === 'dark' })}>
                    <Link href={`/item?${params}`}
                        className='flex flex-col h-full'>
                        <div id='image' className='aspect-square max-w-full px-4 py-4 border-b border-foreground flex justify-center items-center'>
                            {image ?
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    key={item.id}
                                    src={image.url}
                                    alt={item.name}
                                    className='h-full object-scale-down'
                                /> :
                                <div className='flex h-full items-center justify-center'>
                                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='size-6'>
                                        <path strokeLinecap='round' strokeLinejoin='round' d='m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />
                                    </svg>
                                </div>
                            }
                        </div>
                        <div id='itemInfo' className='mb-4'>
                            <div className='text-sm uppercase font-bold text-start'>{item.brand}</div>
                            <div className='mt-1 text-base sm:text-lg text-start '>{item.name}</div>

                        </div>
                        <div id='itemPrice' className='mt-2 flex-1 flex flex-col justify-end font-bold text-lg'>
                            {formattedValue}
                        </div>
                    </Link>
                    <div className='absolute right-0 bottom-0 h-[50px] w-[50px] flex items-center justify-center'>
                        <motion.div
                            transition={transition}
                            whileHover={{
                                scale: 1.5,
                            }}
                            className='flex items-center justify-center text-foreground' >
                            <Button variant='light' className='min-w-min px-0 h-min background-transparent' onPress={() => (addItem(item))}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </>
        )
    }
}