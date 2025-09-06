"use client"
import { motion, useScroll, useSpring } from 'motion/react';
import { Suspense } from 'react';

export function ScrollProgress(){
    const { scrollYProgress } = useScroll()
    const val = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
      })
    return (
        <div className='fixed bottom-0 flex w-full justify-center'>
            <Suspense>
                <div className='absolute right-0 w-[175px] h-[175px] flex items-center justify-center'></div>
            </Suspense>
            <svg className='' fill='transparent' width='175' height='175' viewBox='0 0 100 100'>
                <motion.circle
                    cx='50'
                    cy='50'
                    r='35'
                    pathLength='1'
                    className='stroke-foreground stroke-[1px]'
                    style={{ pathLength: val }}
            />
            </svg>
        </div>
    )
}