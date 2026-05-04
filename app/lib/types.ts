import { Item } from "react-use-cart";

export type ProtectionPlan = "2yr" | "3yr" | null;

export interface CartItemType extends Item {
  id: string;
  originalId: string;
  itemtype: "cam" | "len" | "aer";
  brand: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  protection?: ProtectionPlan;
  protectionPrice?: number;
}