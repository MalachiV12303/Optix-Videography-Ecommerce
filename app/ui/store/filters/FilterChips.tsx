"use client";
import { useRef } from 'react';
import { useQueryState } from 'nuqs';
import { motion } from 'motion/react';
import { Chip } from '@nextui-org/react';
import { searchParams, useFilters } from '@/app/lib/searchParams';

export function FilterChips({sz}:{sz? : 'sm'| 'md'| 'lg' }) {
    const [{ type, brand, res, shutter, mgp, maxap, minfl, maxfl }, setFilters] = useFilters();
    const [search, setSearch] = useQueryState('search', searchParams.search.withOptions({ shallow: false }))
    const constraintsRef = useRef(null)
    const test = [type, brand, res, shutter, mgp, maxap, minfl, maxfl]
    const i = ['type', 'brand', 'res', 'shutter', 'mgp', 'maxap','minfl', 'maxfl']

    const handleClose = (fil: string, remove: string, index: number,) => {
        setFilters({ [fil]: test[index].filter(item => item !== remove) })
    }
    
    return (
        <div ref={constraintsRef} className='flex max-w-full lowercase'>
            <motion.div drag={'x'} dragConstraints={constraintsRef} className='flex min-w-fit min-h-min gap-1'>
                {search ?
                    <Chip classNames={{ base: 'sm:h-5' }} size="sm" key={search} variant="flat"
                        onClose={() => { setSearch(null) }}>
                        search: {search}
                    </Chip> : null}
                {test.map((fil, index) =>
                (fil.map((f) => (
                    <Chip classNames={{ base: 'bg-foreground text-background px-2' }} size={sz? sz: 'sm'} key={index + f} variant="flat" onClose={() => handleClose(i[index], f, index)}>
                        {i[index]}: 
                        {' '+f}
                    </Chip>
                ))))}
            </motion.div>
        </div>
    )
}