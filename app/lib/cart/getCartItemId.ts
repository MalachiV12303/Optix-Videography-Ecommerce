import { ProtectionPlan } from "../types";

export function getCartItemId(
  id: string,
  protection: ProtectionPlan = null
) {
  const protectionKey = protection ?? "none";
  return `${id}-${protectionKey}`;
}