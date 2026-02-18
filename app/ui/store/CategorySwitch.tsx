"use client";
import clsx from 'clsx';
import { useQueryState } from 'nuqs';
import { searchParams, useFilters } from '@/app/lib/searchParams';

export function CategorySwitch(){
    const CATEGORIES = [['len', 'lenses'], ['cam', 'cameras'], ['aer', 'aerial']]
    const [, setFilters]= useFilters()
    const [ category, setCategory ] = useQueryState('category', 
        searchParams.category.withOptions({
            shallow: false
    }))
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        element?.scrollIntoView({ behavior: "smooth" });
    }

    return(
        <div className="sticky top-0 flex justify-evenly items-center border-foreground h-full w-full"> 
            {CATEGORIES.map((cat)=>(
                <label
                    key={cat[0]}
                    className={clsx('w-full px-8 duration-300 ease-in flex h-full justify-center border-foreground', { 'bg-foreground text-background' : category === cat[0] })}>
                    <button
                        onClick={() => {
                            setCategory(cat[0])
                            setFilters(null)
                            scrollToSection('storeContent')
                        }}
                        className='flex w-full flex-row items-center justify-center'>
                        {cat[0].split('').map((letter, index)=>(<span key={index}>{letter}</span>))}
                    </button>
                </label>
            ))}
        </div>
    )
};