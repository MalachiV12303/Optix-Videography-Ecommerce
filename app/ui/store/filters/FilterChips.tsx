"use client";
import { useQueryState } from 'nuqs';
import { Chip } from '@nextui-org/react';
import { searchParams, useFilters } from '@/app/lib/searchParams';

export function FilterChips({ sz }: { sz?: 'sm' | 'md' | 'lg' }) {
    const [{ type, brand, res, shutter, mgp, maxap, minfl, maxfl }, setFilters] = useFilters();
    const [search, setSearch] = useQueryState('search', searchParams.search.withOptions({ shallow: false }))
    const test = [type, brand, res, shutter, mgp, maxap, minfl, maxfl]
    const i = ['type', 'brand', 'res', 'shutter', 'mgp', 'maxap', 'minfl', 'maxfl']

    const handleClose = (fil: string, remove: string, index: number,) => {
        setFilters({ [fil]: test[index].filter(item => item !== remove) })
    }

    return (
        <div className="flex flex-wrap lowercase gap-2 my-auto">
            {search ?
                <Chip classNames={{ base: 'bg-transparent text-foreground border-1 border-foreground px-2', closeButton: "p-2" }} size={sz ? sz : 'sm'} key={search} variant="flat"
                    onClose={() => { setSearch(null) }}>
                    search: {search}
                </Chip> : null}
            {test.map((fil, index) =>
            (fil.map((f) => (
                <Chip classNames={{ base: 'bg-transparent text-foreground border-1 border-foreground px-2', closeButton: "p-2" }} size={sz ? sz : 'sm'} key={index + f} onClose={() => handleClose(i[index], f, index)}>
                    {i[index]}:
                    {' ' + f}
                </Chip>
            ))))}
        </div>
    )
}