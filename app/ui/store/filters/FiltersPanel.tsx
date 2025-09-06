"use client";
import React from 'react'
import { Filters } from '@ui/store/filters/Filters'
import { FilterChips } from '@ui/store/filters/FilterChips'
import { motion } from 'motion/react'
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'

export default function FiltersPanel({
  itemtype,
  type,
  contentClassname,
}: {
  itemtype: string,
  type: string,
  contentClassname?: string,
}) {

  return type === 'desktop'
    ? (<>
      <Filters it={itemtype} />
      <motion.div
        className="absolute top-0 right-0 w-px h-full bg-foreground origin-top" />
    </>
    ) : (
      <Popover
        shouldBlockScroll
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                opacity: {
                  duration: 0.15,
                },
                y: {
                  duration: 0.4,
                },
              },
            },
            exit: {
              y: "5%",
              opacity: 0,
              transition: {
                opacity: {
                  duration: 0.1,
                },
                y: {
                  duration: 0.4,
                },
              },
            },
          },
        }}

        placement="bottom-end"
        classNames={{
          content: "bg-background border border-foreground mt-4 py-4",
          trigger: "h-8 rounded-full font-semibold bg-transparent text-foreground border-1",
        }}>
        <PopoverTrigger >
          <Button variant='light'>
            change filters
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`${contentClassname} relative max-h-[75dvh]`}>
          <div className="text-xl w-full lowercase scrollbar overflow-x-hidden">
            <Filters it={itemtype} />
          </div>
          <div className='overflow-y-hidden w-full py-4 overflow-auto no-scrollbar'>
            <FilterChips sz={'lg'} />
          </div>
        </PopoverContent>
      </Popover>
    )
}
