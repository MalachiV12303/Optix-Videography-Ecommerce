"use client";
import { Aerial, Camera, Lense } from "@lib/db/schema";
import { Item } from "@ui/store/catalogue/Item";

export function ItemsPanel({ items }: { items: Camera[] | Lense[] | Aerial[]}) {
  return (
    <ul className="group/list w-full grid grid-cols-2 md:grid-cols-3 lg:pl-4 py-4 gap-y-4 gap-x-2">
      {items && items.length !== 0 ? items.map((item) => {
        return (
          <li key={item.id}>
            <Item item={item} />
          </li>
        )
      }) :
        <li className="text-xl min-h-[50vh] flex justify-center items-center col-span-2 lg:col-span-3 2xl:col-span-4">
          <span> No Items Found With Current Filters... </span>
        </li>
      }
    </ul>
  )
};