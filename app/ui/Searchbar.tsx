"use client";
import { searchParams } from "@lib/searchParams";
import { useQueryState } from "nuqs";

export default function Searchbar() {
    const [search, setSearch] = useQueryState("search", searchParams.search.withOptions({ shallow: false }))
    // const updateSearch = useDebouncedCallback((term) => { setSearch(term) }, 450)
    // removed debounced callback, issues with value and defaultValue, chips would not clear input unless value is used
    return (
        <div className="hidden sm:flex gap-2 items-center border-b border-foreground ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input spellCheck={false} value={search} placeholder="search for products..." className="py-2 placeholder:text-foreground bg-transparent outline-none"
                onChange={e => setSearch(e.target.value)} />
        </div>
    )
};