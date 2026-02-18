// app/lib/filters/normalize.ts
import { RawStoreFilters, StoreFilters, StoreCategory } from "./types";

const isCategory = (v: string): v is StoreCategory =>
  v === "cam" || v === "len" || v === "aer";

export function normalizeStoreFilters(
  raw: RawStoreFilters
): StoreFilters {
  return {
    category:
      raw.category && isCategory(raw.category)
        ? raw.category
        : "cam",

    search: raw.search ?? "",
    type: raw.type ?? [],
    brand: raw.brand ?? [],
    price: raw.price ?? [0, 3000],
    res: raw.res ?? [],
    shutter: raw.shutter ?? [],
    mgp: raw.mgp ?? [],
    minfl: raw.minfl ?? [],
    maxfl: raw.maxfl ?? [],
    maxap: raw.maxap ?? [],
    mount: raw.mount ?? [],
    time: raw.time ?? [],
    distance: raw.distance ?? [],
    altitude: raw.altitude ?? [],
  };
}

