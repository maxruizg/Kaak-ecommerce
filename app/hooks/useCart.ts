import { useFetcher } from "@remix-run/react";
import { useCallback } from "react";

export function useCart() {
  const fetcher = useFetcher();

  const addItem = useCallback(
    (productId: string, quantity: number = 1, variantId?: string) => {
      fetcher.submit(
        { intent: "add", productId, quantity: String(quantity), variantId: variantId || "" },
        { method: "POST", action: "/api/cart" }
      );
    },
    [fetcher]
  );

  const updateItem = useCallback(
    (productId: string, quantity: number, variantId?: string) => {
      fetcher.submit(
        { intent: "update", productId, quantity: String(quantity), variantId: variantId || "" },
        { method: "POST", action: "/api/cart" }
      );
    },
    [fetcher]
  );

  const removeItem = useCallback(
    (productId: string, variantId?: string) => {
      fetcher.submit(
        { intent: "remove", productId, variantId: variantId || "" },
        { method: "POST", action: "/api/cart" }
      );
    },
    [fetcher]
  );

  return {
    addItem,
    updateItem,
    removeItem,
    isSubmitting: fetcher.state !== "idle",
  };
}
