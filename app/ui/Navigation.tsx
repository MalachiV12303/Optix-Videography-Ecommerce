"use client";
import Link from 'next/link';
import ThemeToggle from '@ui/ThemeToggle';
import Searchbar from '@ui/Searchbar';
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("../Cart"), { ssr: false });

export default function Navigation (){
    return (
        <nav className="fixed top-0 z-50 w-screen border-b-1 border-foreground bg-background">
            <div className="h-24 container flex items-center justify-between">
                <Link href='/' className="text-5xl font-mono">GLEAM</Link>
                <div className='flex items-center gap-4'>
                    <Searchbar />
                    <Cart />
                    <ThemeToggle />
                </div>
            </div>
            {/* <CategorySwitch /> */}
        </nav>
    )
};