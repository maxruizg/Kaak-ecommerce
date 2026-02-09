import type { LoaderFunctionArgs, ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useOutletContext, useNavigation, useActionData } from "@remix-run/react";
import { getCart, getCartTotal, clearCart } from "~/lib/cart.server";
import { createPaymentIntent } from "~/lib/paycode.server";
import { generateOrderNumber, generateBookingNumber } from "~/lib/utils";
import { validateForm, customerSchema, shippingSchema, checkoutRentalSchema } from "~/lib/validators";
import { Navbar } from "~/components/layout/Navbar";
import { Footer } from "~/components/layout/Footer";
import { PageContainer } from "~/components/layout/PageContainer";
import { CheckoutForm } from "~/components/checkout/CheckoutForm";
import { CartSummary } from "~/components/cart/CartSummary";
import { MayaDivider } from "~/components/maya/MayaDivider";

export const meta: MetaFunction = () => [
  { title: "Checkout — K'Á-AK" },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const cart = await getCart(request);
  if (cart.items.length === 0) {
    return redirect("/carrito");
  }
  const { subtotal } = getCartTotal(cart);
  const hasRentalItems = cart.items.some((i) => i.isRental);
  return json({ cart, subtotal, hasRentalItems });
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const cart = await getCart(request);
    if (cart.items.length === 0) {
      return redirect("/carrito");
    }

    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Validate customer
    const customerResult = validateForm(customerSchema, {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
    });

    // Validate shipping
    const shippingResult = validateForm(shippingSchema, {
      street: data.street,
      number: data.number,
      colony: data.colony,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      references: data.references,
    });

    // Validate rental fields if cart has rental items
    const rentalItems = cart.items.filter((i) => i.isRental);
    let rentalResult: ReturnType<typeof validateForm<unknown, { eventDate: string; eventAddress: string; guestCount: number }>> | null = null;

    if (rentalItems.length > 0) {
      rentalResult = validateForm(checkoutRentalSchema, {
        eventDate: data.eventDate,
        eventAddress: data.eventAddress,
        guestCount: data.guestCount,
      });
    }

    if (!customerResult.success || !shippingResult.success || (rentalResult && !rentalResult.success)) {
      return json({
        errors: { ...customerResult.errors, ...shippingResult.errors, ...(rentalResult?.errors || {}) },
      }, { status: 400 });
    }

    const { subtotal } = getCartTotal(cart);

    // Create payment intent (stub)
    const payment = await createPaymentIntent({
      amount: subtotal,
      customerEmail: customerResult.data.email,
      customerName: `${customerResult.data.firstName} ${customerResult.data.lastName}`,
      description: `Pedido K'Á-AK — ${cart.items.length} artículos`,
    });

    // Generate order number (stub — no DB yet)
    const orderNumber = generateOrderNumber();

    // Log order details for development
    console.log("[Checkout Stub] Order created:", {
      orderNumber,
      paymentId: payment.id,
      customer: customerResult.data,
      shipping: shippingResult.data,
      items: cart.items,
      subtotal,
    });

    // Log rental bookings for development
    if (rentalItems.length > 0 && rentalResult?.success) {
      for (const item of rentalItems) {
        const bookingNumber = generateBookingNumber("RNT");
        console.log("[Checkout Stub] Rental booking created:", {
          bookingNumber,
          productId: item.productId,
          customerName: `${customerResult.data.firstName} ${customerResult.data.lastName}`,
          customerEmail: customerResult.data.email,
          customerPhone: customerResult.data.phone,
          eventDate: rentalResult.data.eventDate,
          eventAddress: rentalResult.data.eventAddress,
          guestCount: rentalResult.data.guestCount,
          totalCost: item.price * item.quantity,
        });
      }
    }

    // Clear cart
    const clearCookie = await clearCart(request);

    return redirect(`/orden/${orderNumber}`, {
      headers: { "Set-Cookie": clearCookie },
    });
  } catch (error) {
    console.error("checkout action error:", error);
    return json({ errors: { _form: "Error al procesar el pedido. Intente de nuevo." } }, { status: 500 });
  }
}

export default function Checkout() {
  const { cart, subtotal, hasRentalItems } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { cartItemCount } = useOutletContext<{ cartItemCount: number }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Navbar cartItemCount={cartItemCount} />
      <main className="pt-20 md:pt-24 pb-12">
        <PageContainer>
          <div className="text-center mb-6">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
              Finalizar Compra
            </h1>
            <MayaDivider variant="accent" className="max-w-xs mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <CheckoutForm errors={actionData?.errors} isSubmitting={isSubmitting} hasRentalItems={hasRentalItems} />
            </div>
            <div className="lg:sticky lg:top-24">
              <CartSummary subtotal={subtotal} showCheckoutButton={false} />
            </div>
          </div>
        </PageContainer>
      </main>
      <Footer />
    </>
  );
}
