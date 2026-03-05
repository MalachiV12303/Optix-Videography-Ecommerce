import { useCart } from "react-use-cart";
import { CartItemType } from "../types";

export function useTypedCart() {
  const cart = useCart();

  return {
    ...cart,
    items: cart.items as CartItemType[],
  };
}