'use client'

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter();
  return (
    <Button variant='light' className='bg-background bg-opacity-80 text-lg h-12 w-full border border-foreground' onPress={() => router.back()}>
      return to store
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1} stroke='currentColor' className='size-5'>
        <path strokeLinecap='round' strokeLinejoin='round' d='m7.49 12-3.75 3.75m0 0 3.75 3.75m-3.75-3.75h16.5V4.499' />
      </svg>
    </Button>
  )
}