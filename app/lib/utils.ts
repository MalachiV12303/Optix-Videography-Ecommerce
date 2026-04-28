import { Item } from "react-use-cart";
import { Aerial, Camera, Lense } from "./db/schema";

export const formatCurrency = (amount: number) => {
  return (amount * 1).toLocaleString("en-US", {
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const getItemCat = (item: Item) => {
  return isCamera(item) ? "cam" :
    isLense(item) ? "len" :
      "aer";
};

export const transition = {
  type: "spring",
  duration: 0.7,
  bounce: 0.2
}

export const filterMap = [
  {
    category: "cam",
    param: "type",
    values: [
      { label: "Digital SLR", value: "DSLR" },
      { label: "Mirrorless", value: "Mirrorless" }
    ],
  },
  {
    category: "cam",
    param: "brand",
    values: [
      { label: "Canon", value: "Canon" },
      { label: "Nikon", value: "Nikon" },
      { label: "Sony", value: "Sony" },
      { label: "Panasonic", value: "Panasonic" }
    ],
  },
  {
    category: "cam",
    param: "shutter",
    values: [
      { label: "1/4000 to 30 sec", value: "1/4000 to 30 sec" },
      { label: "1/8000 to 30 sec", value: "1/8000 to 30 sec" },
      { label: "1/8000 to 60 sec", value: "1/8000 to 60 sec" },
      { label: "1/16000 to 60 sec", value: "1/16000 to 60 sec" }
    ],
  },
  {
    category: "cam",
    param: "res",
    values: [
      { label: "1080", value: "1080" },
      { label: "4K 2160", value: "2160" },
      { label: "8K 6144", value: "6144" }
    ],
  },
  {
    category: "cam",
    param: "mgp",
    values: [
      { label: "18.1 Megapixels", value: "18.1" },
      { label: "20.9 Megapixels", value: "20.9" },
      { label: "24.1 Megapixels", value: "24.1" },
      { label: "24.2 Megapixels", value: "24.2" },
      { label: "26.2 Megapixels", value: "26.2" },
      { label: "32.5 Megapixels", value: "32.5" },
      { label: "45.7 Megapixels", value: "45.7" }
    ],
  },
  {
    category: "cam",
    param: "mount",
    values: [
      { label: "Canon EF", value: "Canon EF" },
      { label: "Canon EF-S", value: "Canon EF-S" },
      { label: "Nikon Z", value: "Nikon Z" },
      { label: "Nikon DX", value: "Nikon DX" },
      { label: "Nikon FX", value: "Nikon FX" },
      { label: "Sony E-Mount", value: "Sony E-Mount" },
      { label: "Leica L-Mount", value: "Leica L-Mount" }
    ],
  },
  {
    category: "len",
    param: "type",
    values: [
      { label: "Telephoto Zoom", value: "Telephoto Zoom" },
      { label: "Telephoto Prime", value: "Telephoto Prime" },
      { label: "Standard Zoom", value: "Standard Zoom" },
      { label: "Standard Prime", value: "Standard Prime" },
      { label: "Wide Angle Prime", value: "Wide Angle Prime" }
    ],
  },
  {
    category: "len",
    param: "brand",
    values: [
      { label: "Canon", value: "Canon" },
      { label: "Nikon", value: "Nikon" },
      { label: "Sony", value: "Sony" },
      { label: "Panasonic", value: "Panasonic" },
      { label: "Sigma", value: "Sigma" },
      { label: "Tamron", value: "Tamron" }
    ],
  },
  {
    category: "len",
    param: "maxap",
    values: [
      { label: "f/1.4", value: "f/1.4" },
      { label: "f/1.8", value: "f/1.8" },
      { label: "f/2.8", value: "f/2.8" },
      { label: "f/4", value: "f/4" },
      { label: "f/29", value: "f/29" }
    ],
  },
  {
    category: "len",
    param: "minfl",
    values: [
      { label: "0-10", value: "0-10" },
      { label: "10-17", value: "10-17" },
      { label: "18-25", value: "18-25" },
      { label: "26-49", value: "26-49" },
      { label: "50-69", value: "50-69" },
      { label: "70-99", value: "70-99" },
      { label: "100-169", value: "100-169" },
      { label: "170-499", value: "170-499" }
    ],
  },
  {
    category: "len",
    param: "maxfl",
    values: [
      { label: "0-10", value: "0-10" },
      { label: "10-17", value: "10-17" },
      { label: "18-25", value: "18-25" },
      { label: "26-49", value: "26-49" },
      { label: "50-69", value: "50-69" },
      { label: "70-99", value: "70-99" },
      { label: "100-169", value: "100-169" },
      { label: "170-499", value: "170-499" }
    ],
  },
  {
    category: "len",
    param: "mount",
    values: [
      { label: "Canon EF", value: "Canon EF" },
      { label: "Canon EF-S", value: "Canon EF-S" },
      { label: "Nikon Z", value: "Nikon Z" },
      { label: "Nikon DX", value: "Nikon DX" },
      { label: "Nikon FX", value: "Nikon FX" },
      { label: "Sony E-Mount", value: "Sony E-Mount" },
      { label: "Leica L-Mount", value: "Leica L-Mount" }
    ],
  },
  {
    category: "aer",
    param: "type",
    values: [
      { label: "App-Controlled", value: "App-Controlled" },
      { label: "Remote Control", value: "Remote Control" }
    ],
  },
  {
    category: "aer",
    param: "brand",
    values: [
      { label: "DJI", value: "DJI" },
      { label: "Snaptain", value: "Snaptain" },
      { label: "Contixo", value: "Contixo" },
      { label: "SKYROVER", value: "SKYROVER" }
    ],
  },
  {
    category: "aer",
    param: "altitude",
    values: [
      { label: "1000-1500 meters", value: "1000-1500" },
      { label: "1500-2000 meters", value: "1500-2000" },
      { label: "2000-2500 meters", value: "2000-2500" },
      { label: "2500-3000 meters", value: "2500-3000" },
      { label: "3000+ meters", value: "3000-10000" }
    ],
  },
  {
    category: "aer",
    param: "time",
    values: [
      { label: "15- minutes", value: "0-15" },
      { label: "15-20 minutes", value: "15-20" },
      { label: "20-25 minutes", value: "20-25" },
      { label: "25-30 minutes", value: "25-30" },
      { label: "30-40 minutes", value: "30-40" },
      { label: "40+ minutes", value: "40-1000" }
    ],
  },
  {
    category: "aer",
    param: "distance",
    values: [
      { label: "Less than 2 miles", value: "0-2" },
      { label: "2-4 miles", value: "2-4" },
      { label: "4-6 miles", value: "4-6" },
      { label: "8-10 miles", value: "8-10" },
      { label: "10+ miles", value: "10-1000" }
    ],
  }
];

export function getCategoryFilters(category: string) {
  return filterMap.filter((f) => f.category === category);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCamera(obj: any): obj is Camera {
  return obj && typeof obj === "object" && "megapixels" in obj
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isLense(obj: any): obj is Lense {
  return obj && typeof obj === "object" && "minfl" in obj
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAerial(obj: any): obj is Aerial {
  return obj && typeof obj === "object" && "altitude" in obj
};

