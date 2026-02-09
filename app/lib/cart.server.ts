import { createCookieSessionStorage } from "@remix-run/node";

export interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  variantName?: string;
  isRental?: boolean;
}

export interface Cart {
  items: CartItem[];
}

const cartSessionSecret = process.env.SESSION_SECRET;
if (!cartSessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const cartStorage = createCookieSessionStorage({
  cookie: {
    name: "__kaak_cart",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secrets: [cartSessionSecret],
    secure: process.env.NODE_ENV === "production",
  },
});

export async function getCartSession(request: Request) {
  return cartStorage.getSession(request.headers.get("Cookie"));
}

export async function getCart(request: Request): Promise<Cart> {
  const session = await getCartSession(request);
  const cart = session.get("cart") as Cart | undefined;
  return cart || { items: [] };
}

export async function addToCart(request: Request, item: CartItem) {
  const session = await getCartSession(request);
  const cart = (session.get("cart") as Cart) || { items: [] };

  const existingIndex = cart.items.findIndex(
    (i) => i.productId === item.productId && i.variantId === item.variantId
  );

  if (existingIndex >= 0) {
    cart.items[existingIndex].quantity += item.quantity;
  } else {
    cart.items.push(item);
  }

  session.set("cart", cart);
  return cartStorage.commitSession(session);
}

export async function updateCartItem(
  request: Request,
  productId: string,
  quantity: number,
  variantId?: string
) {
  const session = await getCartSession(request);
  const cart = (session.get("cart") as Cart) || { items: [] };

  const index = cart.items.findIndex(
    (i) => i.productId === productId && i.variantId === variantId
  );

  if (index >= 0) {
    if (quantity <= 0) {
      cart.items.splice(index, 1);
    } else {
      cart.items[index].quantity = quantity;
    }
  }

  session.set("cart", cart);
  return cartStorage.commitSession(session);
}

export async function removeFromCart(request: Request, productId: string, variantId?: string) {
  return updateCartItem(request, productId, 0, variantId);
}

export async function clearCart(request: Request) {
  const session = await getCartSession(request);
  session.set("cart", { items: [] });
  return cartStorage.commitSession(session);
}

export function getCartTotal(cart: Cart) {
  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  return { subtotal, itemCount };
}
