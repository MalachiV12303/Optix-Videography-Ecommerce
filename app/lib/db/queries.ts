import { db } from './drizzle';
import { eq, and, between, inArray, ilike, or, arrayOverlaps } from 'drizzle-orm';
import { aerial, cameras, lenses } from './schema';
import { searchParamsCache } from '../searchParams';
import { SliderValue } from '@nextui-org/slider';

const priceFilter = (itemtype: string, price: SliderValue) => {
    const psv = price.toString().split(',');
    const p = psv.map(parseFloat)
    if(p[0]===0 && p[1] === 3000) //may not be triggered when its supposed to, causing filters to never be undefined
      return undefined;
    return itemtype === 'cam' ? between(cameras.price, p[0], p[1]) :
            itemtype === 'len' ? between(lenses.price, p[0], p[1]): undefined
}

const typeFilter = (itemtype: string, types: string[]) => {
  if (types.length === 0)
    return undefined
  return itemtype === 'cam' ? inArray(cameras.type, types) :
          itemtype === 'len' ? inArray(lenses.type, types) :
              itemtype === 'aer' ? arrayOverlaps(aerial.type, types) : undefined
}

const brandFilter = (itemtype: string, brands: string[]) => {
  if (brands.length === 0)
        return undefined
  return itemtype === 'cam' ? inArray(cameras.brand, brands) :
          itemtype === 'len' ? inArray(lenses.brand, brands) : 
              itemtype === 'aer' ? inArray(aerial.brand, brands) : undefined
}

const searchFilter = (itemtype: string, search: string) => {
  if (search.length === 0)
        return undefined
  return itemtype === 'cam' ? or(ilike(cameras.name, `%${search}%`), ilike(cameras.type, `%${search}%`), ilike(cameras.brand, `%${search}%`)) : undefined
}

const resFilter = (itemtype: string, res: string[]) => {
  if (res.length === 0)
        return undefined
  //using .map because i was having issue using parseAsInt in searchParamsCache, values were null and number[] had no length
  return itemtype === 'cam' ? inArray(cameras.res, res.map((val)=>parseInt(val))) : 
            itemtype === 'aer' ? inArray(aerial.res, res.map((val)=>parseInt(val))) : undefined
}

const shutterFilter = (itemtype: string, shutters: string[]) => {
  if (shutters.length === 0)
        return undefined
  return itemtype === 'cam' ? inArray(cameras.shutter, shutters) : undefined
}

const megapixelFilter = (itemtype: string, megapixels: string[]) => {
  if (megapixels.length === 0)
        return undefined
  return itemtype === 'cam' ? inArray(cameras.megapixels, megapixels) : undefined
}

const maxapFilter = (itemtype: string, maxap: string[]) => {
  if (maxap.length === 0)
        return undefined
  //using .map because i was having issue using parseAsInt in searchParamsCache, values were null and number[] had no length
  return itemtype === 'len' ? inArray(lenses.maxap, maxap) : undefined
}

const mountFilter = (itemtype: string, mounts: string[]) => {
  if (mounts.length === 0)
    return undefined
  return itemtype === 'len' ? arrayOverlaps(lenses.mount, mounts) : undefined
}

const minflFilter = (itemtype: string, minfl: string[]) => {
  const arr = [];
  const min=[];
  const max=[];
  for(let i = 0; i < minfl.length; i++ ){
    arr.push(minfl[i].toString().split('-'));
  }
  for(let x = 0; x < arr.length ; x++){
    min.push(parseFloat(arr[x][0]))
    max.push(parseFloat(arr[x][1]))
  }
  if (minfl.length === 0)
        return undefined
  return itemtype === 'len' ? between(lenses.minfl, Math.min(...min) , Math.max(...min)) : undefined
}

const maxflFilter = (itemtype: string, maxfl: string[]) => {
  const arr = [];
  const min=[];
  const max=[];
  for(let i = 0; i < maxfl.length; i++ ){
    arr.push(maxfl[i].toString().split('-'));
  }
  for(let x = 0; x < arr.length ; x++){
    min.push(parseFloat(arr[x][0]))
    max.push(parseFloat(arr[x][1]))
  }
  if (maxfl.length === 0)
        return undefined
  return itemtype === 'len' ? between(lenses.maxfl, Math.min(...min) , Math.max(...min)) : undefined
}

export async function fetchCameras() {
  const { search, type, brand, price, category, res, shutter, mgp } = searchParamsCache.all();
  const filters = [
     brandFilter(category, brand),
     typeFilter(category, type),
     priceFilter(category, price),
     resFilter(category, res),
     shutterFilter(category, shutter),
     megapixelFilter(category, mgp),
     searchFilter(category, search)
   ].filter(Boolean);
  const whereClause = filters.length > 0 ? and(...filters) : undefined;
  const fetchedCameras = await db
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
    .where(whereClause)
    .orderBy(cameras.id);
  return fetchedCameras;
}


export async function fetchLenses() {
  const { type, brand, price, category, maxap, minfl, maxfl, mount } = searchParamsCache.all();
  const filters = [
     brandFilter(category, brand),
     typeFilter(category, type),
     priceFilter(category, price) ,
     maxapFilter(category, maxap),
     minflFilter(category, minfl),
     maxflFilter(category, maxfl),
     mountFilter(category, mount),
   ].filter(Boolean);

  const whereClause = filters.length > 0 ? and(...filters) : undefined;
  const fetchedLenses = await db
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
    .where(whereClause)
    .orderBy(lenses.id);
  return fetchedLenses;
}

export async function fetchAerial() {
  const { type, brand, price, category } = searchParamsCache.all();
  const filters = [
     brandFilter(category, brand),
     typeFilter(category, type),
     priceFilter(category, price) ,
     //add more filters here
   ].filter(Boolean);

  const whereClause = filters.length > 0 ? and(...filters) : undefined;
  const fetchedAerial = await db
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
    .where(whereClause)
    .orderBy(aerial.id);
  return fetchedAerial;
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