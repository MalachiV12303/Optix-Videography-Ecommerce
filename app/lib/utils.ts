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
    values: ["DSLR", "Mirrorless"],
  },
  {
    category: "cam",
    param: "brand",
    values: ["Canon", "Nikon", "Sony", "Panasonic"],
  },
  {
    category: "cam",
    param: "shutter",
    values: ["1/4000 to 30 sec", "1/8000 to 30 sec", "1/8000 to 60 sec", "1/16000 to 60 sec"],
  },
  {
    category: "cam",
    param: "res",
    values: ["1080", "2160", "6144"],
  },
  {
    category: "cam",
    param: "mgp",
    values: ["18.1", "20.9", "24.1", "24.2", "26.2", "32.5", "45.7"],
  },
  {
    category: "cam",
    param: "mount",
    values: ["Canon EF", "Canon EF-S", "Nikon Z", "Nikon DX", "Nikon FX", "Sony E-Mount", "Leica L-Mount"],
  },
  {
    category: "len",
    param: "type",
    values: ["Telephoto Zoom", "Telephoto Prime", "Standard Zoom", "Standard Prime", "Wide Angle Prime"],
  },
  {
    category: "len",
    param: "brand",
    values: ["Canon", "Nikon", "Sony", "Panasonic", "Sigma", "Tamron"],
  },
  {
    category: "len",
    param: "maxap",
    values: ["f/1.4", "f/1.8", "f/2.8", "f/4", "f/29"],
  },
  {
    category: "len",
    param: "minfl",
    values: ["0-10", "10-17", "18-25", "26-49", "50-69", "70-99", "100-169", "170-499"],
  },
  {
    category: "len",
    param: "maxfl",
    values: ["0-10", "10-17", "18-25", "26-49", "50-69", "70-99", "100-169", "170-499"],
  },
  {
    category: "len",
    param: "mount",
    values: ["Canon EF", "Canon EF-S", "Nikon Z", "Nikon DX", "Nikon FX", "Sony E-Mount", "Leica L-Mount"],
  },
  {
    category: "aer",
    param: "type",
    values: ["App-Controlled", "Remote Control"],
  },
  {
    category: "aer",
    param: "brand",
    values: ["DJI", "Snaptain", "Contixo"],
  }
];

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

