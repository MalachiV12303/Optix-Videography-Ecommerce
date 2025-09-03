'use client'

import React, { useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'
import { CartItem } from '@/app/cartitem'
import { formatCurrency } from '@/app/lib/utils'

export function CheckoutCart() {
    const { cartTotal, items, isEmpty, totalItems } = useCart()
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <div className='bg-background relative flex flex-col max-h-[80dvh] h-full border border-foreground px-2'>
            <p className='py-4 px-4 text-lg'>Order summary ({totalItems} {totalItems === 1 ? 'item' : 'items'})</p>
            <div className='overflow-auto no-scrollbar flex-1 flex flex-col gap-4 divide-y divide-foreground'>
                {!isEmpty ? items.map((it, index) => (
                    <CartItem key={index} item={it} className='px-2 lg:px-8 py-2'></CartItem>
                )) :
                    <div className='h-48 w-full flex justify-center items-center col-span-3 sm:col-span-3 xl:col-span-3'>empty cart</div>}
            </div>
            <div className='px-4 py-2 text-xl w-full flex border-t border-foreground'>
                <span>subtotal:</span>
                <span className='ml-auto font-bold'>${isClient ? formatCurrency(cartTotal) : null}</span>
            </div>
            <div className='px-4 py-2 text-xl w-full flex border-t border-foreground'>
                <span className='font-bold'>order total:</span>
                <span className='ml-auto font-bold'>${isClient ? formatCurrency(cartTotal*1.07) : null}</span>
            </div>
        </div>
    )
}