import { db } from "./drizzle";
import { eq, and, between, inArray, ilike, or, arrayOverlaps } from "drizzle-orm";
import { aerial, cameras, lenses } from "./schema";
import { sql } from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import { StoreFilters } from "../filters/types";

type Filter = SQL | undefined;
type SliderValue = number | [number, number];

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 2500;

const priceFilter = (itemtype: string, price: SliderValue): Filter => {
  if (!Array.isArray(price)) return undefined;

  const [min, max] = price;

  if (min === DEFAULT_MIN_PRICE && max === DEFAULT_MAX_PRICE) {
    return undefined;
  }

  return itemtype === "cam"
    ? between(sql<number>`${cameras.price}`, min, max)
    : itemtype === "len"
      ? between(sql<number>`${lenses.price}`, min, max)
      : itemtype === "aer"
        ? between(sql<number>`${aerial.price}`, min, max)
        : undefined;
};

const typeFilter = (itemtype: string, types: string[]): Filter => {
  if (types.length === 0) return undefined;
  return itemtype === "cam"
    ? inArray(cameras.type, types)
    : itemtype === "len"
      ? inArray(lenses.type, types)
      : itemtype === "aer"
        ? arrayOverlaps(aerial.type, types)
        : undefined;
};

const brandFilter = (itemtype: string, brands: string[]): Filter => {
  if (brands.length === 0) return undefined;

  return itemtype === "cam"
    ? inArray(cameras.brand, brands)
    : itemtype === "len"
      ? inArray(lenses.brand, brands)
      : itemtype === "aer"
        ? inArray(aerial.brand, brands)
        : undefined;
};

const resFilter = (itemtype: string, res: string[]): Filter => {
  if (res.length === 0) return undefined;

  const values = res.map(Number);

  return itemtype === "cam"
    ? inArray(cameras.res, values)
    : itemtype === "aer"
      ? inArray(aerial.res, values)
      : undefined;
};

const shutterFilter = (itemtype: string, shutters: string[]) => {
  if (shutters.length === 0)
    return undefined
  return itemtype === "cam" ? inArray(cameras.shutter, shutters) : undefined
}

const megapixelFilter = (itemtype: string, megapixels: string[]) => {
  if (megapixels.length === 0)
    return undefined
  return itemtype === "cam" ? inArray(cameras.megapixels, megapixels) : undefined
}

const maxapFilter = (itemtype: string, maxap: string[]) => {
  if (maxap.length === 0)
    return undefined
  //using .map because i was having issue using parseAsInt in searchParamsCache, values were null and number[] had no length
  return itemtype === "len" ? inArray(lenses.maxap, maxap) : undefined
}

const mountFilter = (itemtype: string, mounts: string[]): Filter => {
  if (mounts.length === 0) return undefined;
  return itemtype === "cam"
    ? arrayOverlaps(cameras.mount, mounts)
    : itemtype === "len"
      ? arrayOverlaps(lenses.mount, mounts)
      : undefined;
};

const minflFilter = (itemtype: string, minfl: string[]) => {
  const arr = [];
  const min = [];
  const max = [];
  for (let i = 0; i < minfl.length; i++) {
    arr.push(minfl[i].toString().split("-"));
  }
  for (let x = 0; x < arr.length; x++) {
    min.push(parseFloat(arr[x][0]))
    max.push(parseFloat(arr[x][1]))
  }
  if (minfl.length === 0)
    return undefined
  return itemtype === "len" ? between(lenses.minfl, Math.min(...min), Math.max(...min)) : undefined
}

const maxflFilter = (itemtype: string, maxfl: string[]) => {
  const arr = [];
  const min = [];
  const max = [];
  for (let i = 0; i < maxfl.length; i++) {
    arr.push(maxfl[i].toString().split("-"));
  }
  for (let x = 0; x < arr.length; x++) {
    min.push(parseFloat(arr[x][0]))
    max.push(parseFloat(arr[x][1]))
  }
  if (maxfl.length === 0)
    return undefined
  return itemtype === "len" ? between(lenses.maxfl, Math.min(...min), Math.max(...min)) : undefined
}

export async function searchAllProducts(query: string) {
  if (!query) return [];

  const q = `%${query}%`;

  const cams = await db
    .select({
      id: cameras.id,
      name: cameras.name,
      category: sql<string>`'cam'`, //these need to be '' and cannot be "", causes issue with drizzle-orm and postgres driver
    })
    .from(cameras)
    .where(or(
      ilike(cameras.name, q),
    ))
    .limit(5);

  const lens = await db
    .select({
      id: lenses.id,
      name: lenses.name,
      category: sql<string>`'len'`,
    })
    .from(lenses)
    .where(or(
      ilike(lenses.name, q),
    ))
    .limit(5);

  const aer = await db
    .select({
      id: aerial.id,
      name: aerial.name,
      category: sql<string>`'aer'`,
    })
    .from(aerial)
    .where(or(
      ilike(aerial.name, q),
    ))
    .limit(5);

  return [...cams, ...lens, ...aer].slice(0, 8);
}

export async function fetchCameras(filters: StoreFilters) {
  const {
    category,
    type,
    brand,
    price,
    res,
    shutter,
    mgp,
    mount,
  } = filters;
  const whereClause = and(
    brandFilter(category, brand),
    typeFilter(category, type),
    priceFilter(category, price),
    resFilter(category, res),
    shutterFilter(category, shutter),
    megapixelFilter(category, mgp),
    mountFilter(category, mount),
  );
  return db.select().from(cameras).where(whereClause);
}

export async function fetchLenses(filters: StoreFilters) {
  const { type, brand, price, category, maxap, minfl, maxfl, mount } = filters;
  const whereClause = and(
    brandFilter(category, brand),
    typeFilter(category, type),
    priceFilter(category, price),
    maxapFilter(category, maxap),
    minflFilter(category, minfl),
    maxflFilter(category, maxfl),
    mountFilter(category, mount),
  );
  return db.select().from(lenses).where(whereClause);
}

export async function fetchAerial(filters: StoreFilters) {
  const { type, brand, price, category } = filters;
  const whereClause = and(
    brandFilter(category, brand),
    typeFilter(category, type),
    priceFilter(category, price),

  );
  return db.select().from(aerial).where(whereClause);
}

export async function fetchCameraById(id: string) {
  const result = await db
    .select({
      id: cameras.id,
      name: cameras.name,
      type: cameras.type,
      brand: cameras.brand,
      price: cameras.price,
      res: cameras.res,
      megapixels: cameras.megapixels,
      storage: cameras.storage,
      mount: cameras.mount,
      shutter: cameras.shutter,
      description: cameras.description,
    })
    .from(cameras)
    .where(eq(cameras.id, id))
    .limit(1);
  return result[0];
}

export async function fetchLenseById(id: string) {
  const result = await db
    .select({
      id: lenses.id,
      name: lenses.name,
      type: lenses.type,
      brand: lenses.brand,
      price: lenses.price,
      mount: lenses.mount,
      maxap: lenses.maxap,
      minfl: lenses.minfl,
      maxfl: lenses.maxfl,
    })
    .from(lenses)
    .where(eq(lenses.id, id))
    .limit(1);
  return result[0];
}

export async function fetchAerialById(id: string) {
  const result = await db
    .select({
      id: aerial.id,
      name: aerial.name,
      type: aerial.type,
      brand: aerial.brand,
      price: aerial.price,
      time: aerial.time,
      res: aerial.res,
      distance: aerial.distance,
      altitude: aerial.altitude,
      description: aerial.description,
    })
    .from(aerial)
    .where(eq(aerial.id, id))
    .limit(1);
  return result[0];
}