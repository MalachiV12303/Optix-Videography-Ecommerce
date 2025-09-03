'use client'

import React, { useEffect, useState } from 'react'
import { CheckoutCart } from '../ui/checkout/checkoutcart'
import { Button, Spinner } from '@nextui-org/react'

export default function Page() {
    //this is to render cart information without ssr errors
    const [isClient, setIsClient] = useState(false)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        setIsClient(true)
    }, [])
    return (
        <section className='relative max-w-[1500px] flex md:flex-row flex-col mx-auto md:py-12 gap-8 px-4 pb-12'>
            <div className='relative md:hidden'>{isClient ? <CheckoutCart /> : <Spinner />}</div>
            <div className='md:w-2/3 sm:overflow-auto no-scrollbar'>
                <p className='py-4 px-4 text-2xl border-b'>Delivery</p>
                <form className='grid grid-cols-2 gap-y-4 gap-x-4 py-8 px-4'>
                    <label className='flex flex-col col-span-2'><span>your email </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='your.email@outlook.com' type='text' /></label>
                    <label className='flex flex-col'><span>first name </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='Gordon' type='text' /></label>
                    <label className='flex flex-col'><span>last name </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='Lucis Caelum' type='text' /></label>
                    <label className='flex flex-col col-span-2'><span>company (optional) </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='Aperture' type='text' /></label>
                    <label className='flex flex-col'><span>country </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='Accordo' type='text' /></label>
                    <label className='flex flex-col'><span>address </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='2200 Cypress Grove' type='text' /></label>
                    <label className='flex flex-col'><span>address ext. </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='Apt. 09' type='text' /></label>
                    <label className='flex flex-col'><span>city </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='Altissia' type='text' /></label>
                    <label className='flex flex-col'><span>state / province </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='Insomnia' type='text' /></label>
                    <label className='flex flex-col'><span>zip / postal </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='D9333' type='text' /></label>
                </form>
                <p className='py-4 px-4 text-2xl border-b'>Payment</p>
                <form className='grid grid-cols-2 gap-y-4 gap-x-4 py-8 px-4'>
                    <label className='flex flex-col col-span-2'><span>Card Number </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='1818-0907-4837-6003' type='text' /></label>
                    <label className='flex flex-col'><span>CVV </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='222' type='text' /></label>
                    <label className='flex flex-col'><span>Expiration </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='10/2099' type='text' /></label>
                    <label className='flex flex-col col-span-2'><span>Name on Card </span><input disabled className='checkoutInput w-full placeholder:text-foreground' placeholder='Noct Caelum' type='text' /></label>
                </form>
                <div className='px-8 py-2 flex items-center justify-between w-full'>
                    <Button variant='light' className='bg-background rounded-full uppercase font-bold' onPress={() => {
                        if (!visible) {
                            setVisible(true)
                        } else {
                            window.open('https://github.com/MalachiV12303/gleam', '_blank');
                        }
                    }}>
                        {visible ? 'GITHUB' : 'PLACE ORDER'}
                    </Button>
                    {visible ? <span className='text-end font-bold text-red-500'> mock videography market project by malachi valle</span> : null}
                </div>
            </div>
            <div className='hidden md:inline-block min-h-[80dvh] md:w-1/3'>{isClient ? <CheckoutCart /> : <Spinner />}</div>
        </section>
    )
}
