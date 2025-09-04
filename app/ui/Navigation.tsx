"use client";
import Link from 'next/link';
import { cinzel } from './fonts';
import ThemeToggle from './ThemeToggle';
import Searchbar from './Searchbar';
import { Cart } from '../Cart';

export default function Navigation() {
    return (
        <nav className="fixed top-0 z-50 w-screen border-b-1 border-foreground bg-background">
            <div className="h-24 container flex items-center justify-between">
                <Link href='/' className={`${cinzel.className} text-5xl`}>GLEAM</Link>
                <div className='flex items-center gap-4'>
                    <Searchbar />
                    <Cart />
                    <ThemeToggle />
                </div>
            </div>
            {/* <CategorySwitch /> */}
        </nav>
    )
}
