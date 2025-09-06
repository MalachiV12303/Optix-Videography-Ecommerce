"use client";
import { Camera, Lense } from '@/app/lib/db/schema'
import { Item } from '@/app/ui/store/catalogue/Item'
import { ListBlobResultBlob } from '@vercel/blob'

export function ItemsPanel({ items, images }: { items: Camera[] | Lense[], images: ListBlobResultBlob[] }) {
  function findImage(searchTerm: string) {
    const matchingImageBlobs = images.filter(blob =>
      blob.pathname.includes(searchTerm)
    )
    // Return the first matching image blob (if any)
    return matchingImageBlobs.length > 0 ? matchingImageBlobs[0] : null
  }
  return (
    <ul className="group/list w-full grid grid-cols-2 md:grid-cols-1 md:px-4 py-6 gap-y-4 gap-x-2">
      {items && items.length !== 0 ? items.map((item) => {
        return (
          <li key={item.id}>
            <Item item={item} image={findImage(item.id)} />
          </li>
        )
      }) :
        <li className="mt-12 text-lg col-span-2 lg:col-span-3 2xl:col-span-4 flex">
          <p> no items found...</p>
        </li>
      }
    </ul>
  )
}