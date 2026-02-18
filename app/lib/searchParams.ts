import { useQueryStates } from 'nuqs';
import {
  createParser,
  createSearchParamsCache,
  createSerializer,
  parseAsArrayOf,
  parseAsString
} from 'nuqs/server';
// import from 'nuqs/server' to avoid the "use client" directive

type SliderValue = [number, number];

export const parseAsSliderValue = createParser<SliderValue>({
  parse(queryValue) {
    if (!queryValue) return null;

    const parts = queryValue.split(",");

    if (parts.length !== 2) return null;

    const min = Number(parts[0]);
    const max = Number(parts[1]);

    if (Number.isNaN(min) || Number.isNaN(max)) return null;
    if (min > max) return null;

    return [min, max];
  },

  serialize(value) {
    return `${value[0]},${value[1]}`;
  },
});

export const searchParams = {
  id: parseAsString.withDefault(''),
  search: parseAsString.withDefault(''),
  category: parseAsString.withDefault('cam'),

  type: parseAsArrayOf(parseAsString).withDefault([]),
  brand: parseAsArrayOf(parseAsString).withDefault([]),
  price: parseAsSliderValue.withDefault([0, 3000]),
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
};


export const searchParamsCache = createSearchParamsCache({
  id: parseAsString.withDefault(''),
  search: parseAsString.withDefault(''),
  category: parseAsString.withDefault('cam'),

  type: parseAsArrayOf(parseAsString).withDefault([]),
  brand: parseAsArrayOf(parseAsString).withDefault([]),
  price: parseAsSliderValue.withDefault([0, 3000]),
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
    minfl: searchParams.minfl.withOptions({shallow:false}),
    maxfl: searchParams.maxfl.withOptions({shallow:false}),
    maxap: searchParams.maxap.withOptions({shallow:false}),
    mount: searchParams.mount.withOptions({shallow:false}),
    time: searchParams.time.withOptions({shallow:false}),
    distance: searchParams.distance.withOptions({shallow:false}),
    altitude: searchParams.altitude.withOptions({shallow:false}),
  })
};

export function useItemInfo() {
  return useQueryStates({
    id: searchParams.id.withOptions({shallow: false}),
    type: searchParams.type.withOptions({shallow: false}),
  })
};

export const serialize = createSerializer(searchParams)