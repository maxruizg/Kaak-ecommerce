import type { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { addToCart, updateCartItem, removeFromCart } from "~/lib/cart.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;
  const productId = formData.get("productId") as string;
  const variantId = (formData.get("variantId") as string) || undefined;

  let cookie: string;

  switch (intent) {
    case "add": {
      const quantity = Number(formData.get("quantity") || 1);
      const name = formData.get("name") as string;
      const price = Number(formData.get("price"));
      const image = (formData.get("image") as string) || undefined;
      const variantName = (formData.get("variantName") as string) || undefined;

      cookie = await addToCart(request, {
        productId,
        name,
        price,
        quantity,
        image,
        variantId,
        variantName,
      });
      break;
    }
    case "update": {
      const quantity = Number(formData.get("quantity"));
      cookie = await updateCartItem(request, productId, quantity, variantId);
      break;
    }
    case "remove": {
      cookie = await removeFromCart(request, productId, variantId);
      break;
    }
    default:
      return json({ error: "Invalid intent" }, { status: 400 });
  }

  return json({ success: true }, { headers: { "Set-Cookie": cookie } });
}
