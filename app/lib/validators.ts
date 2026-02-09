import { z } from "zod";

const optionalNumber = z
  .union([z.string(), z.number()])
  .optional()
  .transform((v): number | undefined => {
    if (v === "" || v === undefined || v === null) return undefined;
    const n = Number(v);
    return isNaN(n) ? undefined : n;
  });

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  slug: z.string().min(1, "El slug es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  mayaName: z.string().optional(),
  categoryId: z.string().min(1, "La categoría es requerida"),
  basePrice: z.coerce.number().positive("El precio debe ser mayor a 0"),
  comparePrice: optionalNumber,
  sku: z.string().min(1, "El SKU es requerido"),
  isActive: z.coerce.boolean().default(true),
  isFeatured: z.coerce.boolean().default(false),
  isRentable: z.coerce.boolean().default(false),
  freeShipping: z.coerce.boolean().default(false),
  weight: optionalNumber,
  guestCapacity: z.string().optional(),
  grillSize: z.string().optional(),
  material: z.string().optional(),
});

export const customerSchema = z.object({
  email: z.string().email("Email inválido"),
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  phone: z.string().min(10, "Teléfono inválido"),
});

export const shippingSchema = z.object({
  street: z.string().min(1, "La calle es requerida"),
  number: z.string().min(1, "El número es requerido"),
  colony: z.string().min(1, "La colonia es requerida"),
  city: z.string().min(1, "La ciudad es requerida"),
  state: z.string().min(1, "El estado es requerido"),
  zipCode: z.string().regex(/^\d{5}$/, "El código postal debe tener 5 dígitos"),
  references: z.string().optional(),
});

export const rentalBookingSchema = z.object({
  productId: z.string().min(1, "Selecciona un barril"),
  customerName: z.string().min(1, "El nombre es requerido"),
  customerEmail: z.string().email("Email inválido"),
  customerPhone: z.string().min(10, "Teléfono inválido"),
  eventDate: z.string().min(1, "La fecha es requerida"),
  eventAddress: z.string().min(1, "La dirección es requerida"),
  guestCount: z.coerce.number().positive("Ingresa el número de invitados"),
  notes: z.string().optional(),
});

export const eventBookingSchema = z.object({
  serviceType: z.enum(["chef", "chef_waiter"], {
    errorMap: () => ({ message: "Selecciona un tipo de servicio" }),
  }),
  customerName: z.string().min(1, "El nombre es requerido"),
  customerEmail: z.string().email("Email inválido"),
  customerPhone: z.string().min(10, "Teléfono inválido"),
  eventDate: z.string().min(1, "La fecha es requerida"),
  eventDuration: z.coerce.number().min(2, "Mínimo 2 horas"),
  guestCount: z.coerce.number().positive("Ingresa el número de invitados"),
  eventAddress: z.string().min(1, "La dirección es requerida"),
  menuDetails: z.string().optional(),
  notes: z.string().optional(),
});

export const promotionSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  code: z.string().min(1, "El código es requerido").toUpperCase(),
  description: z.string().optional(),
  type: z.enum(["percentage", "fixed", "freeShipping"]),
  value: z.coerce.number().min(0, "El valor debe ser positivo"),
  minPurchase: optionalNumber,
  maxUses: optionalNumber,
  isActive: z.coerce.boolean().default(true),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const checkoutRentalSchema = z.object({
  eventDate: z.string().min(1, "La fecha es requerida"),
  eventAddress: z.string().min(1, "La dirección es requerida"),
  guestCount: z.coerce.number().positive("Ingresa el número de invitados"),
});

export const contactSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  subject: z.string().min(1, "El asunto es requerido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export function validateForm<I, O>(schema: z.ZodType<O, z.ZodTypeDef, I>, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const key = issue.path.join(".");
      if (!errors[key]) {
        errors[key] = issue.message;
      }
    }
    return { success: false as const, errors, data: undefined };
  }
  return { success: true as const, errors: undefined, data: result.data };
}
