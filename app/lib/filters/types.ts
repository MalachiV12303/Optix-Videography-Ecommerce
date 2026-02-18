// app/lib/filters/types.ts

export type StoreCategory = "cam" | "len" | "aer";

export type RawStoreFilters = {
  category?: string;
  search?: string;
  type?: string[];
  brand?: string[];
  price?: number | [number, number];
  res?: string[];
  shutter?: string[];
  mgp?: string[];
  minfl?: string[];
  maxfl?: string[];
  maxap?: string[];
  mount?: string[];
  time?: string[];
  distance?: string[];
  altitude?: string[];
};

export type StoreFilters = {
  category: StoreCategory;
  search: string;
  type: string[];
  brand: string[];
  price: number | [number, number];
  res: string[];
  shutter: string[];
  mgp: string[];
  minfl: string[];
  maxfl: string[];
  maxap: string[];
  mount: string[];
  time: string[];
  distance: string[];
  altitude: string[];
};
