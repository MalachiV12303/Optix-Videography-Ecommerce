import { CartItemType, ProtectionPlan } from "../types";

type CreateCartItemArgs = {
  id: string;
  itemtype: "cam" | "len" | "aer";
  brand: string;
  name: string;
  price: number;

  imageUrl?: string | null;

  protection?: ProtectionPlan;
  protectionPrice?: number;
};

export function createCartItem({
  id,
  itemtype,
  brand,
  name,
  price,
  imageUrl,
  protection = null,
  protectionPrice = 0,
}: CreateCartItemArgs): CartItemType {

  const protectionKey = protection ?? "none";

  return {
    id: `${id}-${protectionKey}`, // unique cart ID
    originalId: id,
    itemtype,

    brand,
    name,
    price,

    imageUrl: imageUrl ?? null,

    protection,
    protectionPrice,
  };
}