'use client'

import { Camera, Lense } from '@/app/lib/db/schema'
import { StoreItem } from '@/app/ui/store/catalogue/store-items'
import { ListBlobResultBlob } from '@vercel/blob'

export function ItemsPanel({ items, images }: { items: Camera[] | Lense[], images: ListBlobResultBlob[]}) {
  function findImage(searchTerm: string){
    const matchingImageBlobs = images.filter(blob => 
      blob.pathname.includes(searchTerm)
    )
    // Return the first matching image blob (if any)
    return matchingImageBlobs.length > 0 ? matchingImageBlobs[0] : null
  }
  return (
    <>
      <div className="sm:px-8 py-8 w-full sm:h-min no-scrollbar relative grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-12 gap-x-4 sm:gap-x-12 bg-transparent place-items-center">
        {items && items.length !==0 ? items.map((item) => {
          return (
            <StoreItem key={item.id} item={item} image={findImage(item.id)} />
          )
        }) :
          <div className="mt-12 text-lg col-span-2 lg:col-span-3 2xl:col-span-4 flex">
            <p> no items found...</p>
          </div>
        }
        <div className='w-full h-px col-span-2 lg:col-span-3 2xl:col-span-4 bg-foreground' />
        
      </div>
      {/* <motion.div
        className="absolute top-0 right-0 w-px h-full bg-foreground origin-top "
        style={{ scaleY }} /> */}
    </>
  )
}