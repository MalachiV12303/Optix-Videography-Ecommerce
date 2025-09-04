import Link from 'next/link';
import { Item, useCart } from 'react-use-cart';
import { formatCurrency, getItemCat } from './lib/utils';
import { Button } from '@nextui-org/react';

export default function CartItem({ item, className }: { item: Item, className: string }) {
    const { updateItemQuantity } = useCart()
    const params = new URLSearchParams()
    params.set('id', item.id.toString())
    params.set('itemtype', getItemCat(item))
    return (
        <div className={`${className} w-full flex gap-4 items-start text-foreground`}>
            <Link className='flex-1 pt-1' href={`/item?${params}`}>
                <span className='text-sm uppercase font-bold'>{item.brand} {getItemCat(item)} </span>
                <p className='text-base'>{item.name}</p>
                <p className='sm:text-sm lowercase'>{item.type}</p>
            </Link>
            <div className='flex flex-col items-end h-full'>
                <Button variant='light'
                    className='min-w-0 w-fit h-fit'
                    isIconOnly
                    disableRipple
                    onPress={() => (updateItemQuantity(item.id, item.quantity ? item.quantity - 1 : 0))}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </Button>
                <div className='mt-auto pt-2 flex flex-col'>
                    <span className='font-bold text-end'>  {item.quantity ? formatCurrency(item.price * item.quantity) : formatCurrency(item.price)}</span>
                    <span>{item.quantity} in cart</span>
                </div>

            </div>
        </div>
    )
}