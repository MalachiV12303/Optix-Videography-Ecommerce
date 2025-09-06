"use client";
import { Camera, Lense } from '@/app/lib/db/schema'
import { StoreItem } from '@/app/ui/store/catalogue/StoreItems'
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
      <ul className="group/list w-full grid grid-cols-2 sm:grid-cols-1 sm:px-4 py-6 gap-y-4 gap-x-2">
        {items && items.length !==0 ? items.map((item) => {
          return (
            <li key={item.id}>
              <StoreItem item={item} image={findImage(item.id)} />
            </li>
          )
        }) :
          <li className="mt-12 text-lg col-span-2 lg:col-span-3 2xl:col-span-4 flex">
            <p> no items found...</p>
          </li>
        }
        {/* <div className='w-full h-px col-span-2 lg:col-span-3 2xl:col-span-4 bg-blue-500' /> */}
      </ul>
      {/* <motion.div
        className="absolute top-0 right-0 w-px h-full bg-foreground origin-top "
        style={{ scaleY }} /> */}
    </>
  )
}