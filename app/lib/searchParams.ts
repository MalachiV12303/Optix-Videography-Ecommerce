import {  type SliderValue } from '@nextui-org/slider';
import { useQueryStates } from 'nuqs';
import {
  createParser,
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  parseAsString
} from 'nuqs/server'
// import from 'nuqs/server' to avoid the "use client" directive

export const parseAsSliderValue = createParser({
  parse(queryValue) {
    const inBetween = queryValue.split(',')
    const isValid = inBetween.length === 2 && inBetween !== undefined
    if (!isValid) {
      return null
    }
    return <SliderValue>([parseFloat(inBetween[0]), parseFloat(inBetween[1])]);
  },
  serialize(value) {
    return value.toString()
  }
})

export const searchParams = {
  id: parseAsString.withDefault(''),
  search: parseAsString.withDefault(''),
  category: parseAsString.withDefault('cam'),

  type: parseAsArrayOf(parseAsString).withDefault([]),
  brand: parseAsArrayOf(parseAsString).withDefault([]),
  price: parseAsSliderValue.withDefault(<SliderValue>([0, 3000])),
  res: parseAsArrayOf(parseAsString).withDefault([]),
  shutter: parseAsArrayOf(parseAsString).withDefault([]),
  mgp: parseAsArrayOf(parseAsString).withDefault([]),
  minfl: parseAsArrayOf(parseAsString).withDefault([]),
  maxfl: parseAsArrayOf(parseAsString).withDefault([]),
  maxap: parseAsArrayOf(parseAsString).withDefault([]),
  mount: parseAsArrayOf(parseAsString).withDefault([]),
  time: parseAsArrayOf(parseAsString).withDefault([]),
  distance: parseAsArrayOf(parseAsString).withDefault([]),
  altitude: parseAsArrayOf(parseAsString).withDefault([]),
}


export const searchParamsCache = createSearchParamsCache({
  // List your search param keys and associated parsers here:
  id: parseAsString.withDefault(''),
  search: parseAsString.withDefault(''),
  category: parseAsString.withDefault('cam'),

  type: parseAsArrayOf(parseAsString).withDefault([]),
  brand: parseAsArrayOf(parseAsString).withDefault([]),
  price: parseAsSliderValue.withDefault(<SliderValue>([0, 3000])),
  res: parseAsArrayOf(parseAsString).withDefault([]),
  shutter: parseAsArrayOf(parseAsString).withDefault([]),
  mgp: parseAsArrayOf(parseAsString).withDefault([]),
  minfl: parseAsArrayOf(parseAsString).withDefault([]),
  maxfl: parseAsArrayOf(parseAsString).withDefault([]),
  maxap: parseAsArrayOf(parseAsString).withDefault([]),
  mount: parseAsArrayOf(parseAsString).withDefault([]),
  time: parseAsArrayOf(parseAsString).withDefault([]),
  distance: parseAsArrayOf(parseAsString).withDefault([]),
  altitude: parseAsArrayOf(parseAsString).withDefault([]),
})


export function useFilters() {
  return useQueryStates({
    search: searchParams.search.withOptions({shallow: false}),
    type: searchParams.type.withOptions({shallow:false}),
    brand: searchParams.brand.withOptions({shallow:false}),
    price: searchParams.price.withOptions({shallow:false}),
    res: searchParams.res.withOptions({shallow:false}),
    shutter: searchParams.shutter.withOptions({shallow:false}),
    mgp: searchParams.mgp.withOptions({shallow:false}),
    minfl: searchParams.shutter.withOptions({shallow:false}),
    maxfl: searchParams.mgp.withOptions({shallow:false}),
    maxap: searchParams.maxap.withOptions({shallow:false}),
    mount: searchParams.mount.withOptions({shallow:false}),
    time: searchParams.time.withOptions({shallow:false}),
    distance: searchParams.distance.withOptions({shallow:false}),
    altitude: searchParams.altitude.withOptions({shallow:false}),
  })
}

export function useItemInfo() {
  return useQueryStates({
    id: searchParams.id.withOptions({shallow: false}),
    type: searchParams.type.withOptions({shallow: false}),
  })
}

export const serialize = createSerializer(searchParams)