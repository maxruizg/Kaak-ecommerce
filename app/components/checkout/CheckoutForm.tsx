import { useState, useEffect, useRef } from "react";
import { Form } from "@remix-run/react";
import { Input } from "~/components/ui/Input";
import { Select } from "~/components/ui/Select";
import { Button } from "~/components/ui/Button";
import { cn } from "~/lib/utils";
import { mexicanStates, getStateLabel } from "~/lib/mexican-states";

interface CheckoutFormProps {
  errors?: Record<string, string>;
  isSubmitting?: boolean;
  hasRentalItems?: boolean;
}

type AddressPhase = "zip" | "loading" | "autofilled" | "manual";

function SectionCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-obsidian-700/50 bg-obsidian-900/40 px-4 py-3 space-y-2.5">
      <div className="flex items-center gap-2">
        <span className="text-fire-500">{icon}</span>
        <h2 className="font-heading font-semibold text-xs text-obsidian-300 uppercase tracking-wider">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export function CheckoutForm({ errors = {}, isSubmitting = false, hasRentalItems = false }: CheckoutFormProps) {
  const [zipCode, setZipCode] = useState("");
  const [isLoadingZip, setIsLoadingZip] = useState(false);
  const [autoState, setAutoState] = useState("");
  const [autoCity, setAutoCity] = useState("");
  const [autoColonies, setAutoColonies] = useState<string[]>([]);
  const [selectedColony, setSelectedColony] = useState("");
  const [phase, setPhase] = useState<AddressPhase>("zip");
  const abortRef = useRef<AbortController | null>(null);
  const streetRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (zipCode.length !== 5 || !/^\d{5}$/.test(zipCode)) {
      if (phase !== "zip") {
        setAutoState("");
        setAutoCity("");
        setAutoColonies([]);
        setSelectedColony("");
        setPhase("zip");
      }
      return;
    }

    setPhase("loading");

    const timer = setTimeout(() => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoadingZip(true);

      fetch(`/api/zip-lookup?zip_code=${zipCode}`, { signal: controller.signal })
        .then((res) => {
          if (!res.ok) throw new Error("lookup failed");
          return res.json();
        })
        .then((data: { state?: string; city?: string; colonies?: string[] }) => {
          const state = data.state ?? "";
          const city = data.city ?? "";
          const colonies = data.colonies ?? [];
          setAutoState(state);
          setAutoCity(city);
          setAutoColonies(colonies);
          setSelectedColony(colonies.length === 1 ? colonies[0] : "");
          setPhase(state || city ? "autofilled" : "manual");
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            setAutoState("");
            setAutoCity("");
            setAutoColonies([]);
            setSelectedColony("");
            setPhase("manual");
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) {
            setIsLoadingZip(false);
          }
        });
    }, 400);

    return () => {
      clearTimeout(timer);
      abortRef.current?.abort();
    };
  }, [zipCode]);

  useEffect(() => {
    if (phase === "autofilled" && autoColonies.length <= 1) {
      setTimeout(() => streetRef.current?.focus(), 350);
    }
  }, [phase, autoColonies.length]);

  const showAddressFields = phase === "autofilled" || phase === "manual";
  const stateLabel = autoState ? getStateLabel(autoState) : "";

  return (
    <Form method="post" className="space-y-3">
      {/* Contact */}
      <SectionCard
        icon={
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        }
        title="Contacto"
      >
        <div className="grid grid-cols-2 gap-2.5">
          <Input compact name="firstName" label="Nombre" placeholder="Tu nombre" error={errors.firstName} required />
          <Input compact name="lastName" label="Apellido" placeholder="Tu apellido" error={errors.lastName} required />
          <Input compact name="email" label="Email" type="email" placeholder="tu@email.com" error={errors.email} required />
          <div className="space-y-0.5">
            <label htmlFor="phone" className="block text-xs font-medium text-obsidian-300">Teléfono</label>
            <div className={cn(
              "flex items-center rounded-lg border bg-obsidian-800/60 transition-colors overflow-hidden",
              "focus-within:border-fire-500 focus-within:ring-2 focus-within:ring-fire-500/20",
              errors.phone ? "border-crimson-500" : "border-obsidian-600/50"
            )}>
              <span className="flex items-center gap-1.5 pl-3 pr-2 text-sm text-obsidian-400 shrink-0 select-none border-r border-obsidian-600/50">
                <svg className="h-3.5 w-5 shrink-0" viewBox="0 0 640 480" fill="none">
                  <rect width="640" height="480" fill="#fff"/>
                  <rect width="213.3" height="480" fill="#006847"/>
                  <rect x="426.7" width="213.3" height="480" fill="#ce1126"/>
                  <circle cx="320" cy="240" r="45" fill="#006847"/>
                </svg>
                +52
              </span>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="999 123 4567"
                required
                className="w-full bg-transparent px-2.5 py-1.5 text-sm text-obsidian-100 placeholder:text-obsidian-500 outline-none"
              />
            </div>
            {errors.phone && <p className="text-xs text-crimson-600">{errors.phone}</p>}
          </div>
        </div>
      </SectionCard>

      {/* Shipping Address */}
      <SectionCard
        icon={
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
        }
        title="Dirección de envío"
      >
        <div className="space-y-2.5">
          {/* ZIP row */}
          <div className={showAddressFields ? "grid grid-cols-2 gap-2.5" : ""}>
            <div className="space-y-0.5">
              <label htmlFor="zipCode" className="block text-xs font-medium text-obsidian-300">
                Código Postal
              </label>
              <div className="relative">
                <input
                  id="zipCode"
                  name="zipCode"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={5}
                  placeholder={showAddressFields ? "97000" : "Ingresa tu código postal"}
                  required
                  autoComplete="postal-code"
                  className={[
                    "w-full rounded-lg border bg-obsidian-800/60 px-3 text-obsidian-100 placeholder:text-obsidian-500 transition-all duration-300",
                    "focus:border-fire-500 focus:outline-none focus:ring-2 focus:ring-fire-500/20",
                    errors.zipCode
                      ? "border-crimson-500 focus:border-crimson-500 focus:ring-crimson-500/20"
                      : showAddressFields
                        ? "border-jade-600/40"
                        : "border-obsidian-600/50",
                    "py-1.5 text-sm",
                  ].join(" ")}
                />
                {isLoadingZip && (
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-obsidian-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
              </div>
              {errors.zipCode && <p className="text-xs text-crimson-600">{errors.zipCode}</p>}
              {phase === "zip" && !errors.zipCode && (
                <p className="text-[11px] text-obsidian-500">
                  5 dígitos para autocompletar
                </p>
              )}
            </div>

            {/* Autofill summary chip */}
            {phase === "autofilled" && stateLabel && (
              <div className="flex items-end animate-fade-in">
                <div className="w-full rounded-lg border border-jade-600/30 bg-jade-600/5 px-3 py-1.5 flex items-center gap-2 text-sm">
                  <svg className="h-3.5 w-3.5 text-jade-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-obsidian-200 truncate">
                    {stateLabel}{autoCity ? `, ${autoCity}` : ""}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPhase("manual")}
                    className="ml-auto text-obsidian-500 hover:text-fire-400 transition-colors shrink-0"
                    title="Editar manualmente"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Hidden inputs for autofilled state/city */}
          {phase === "autofilled" && (
            <>
              <input type="hidden" name="state" value={autoState} />
              <input type="hidden" name="city" value={autoCity} />
            </>
          )}

          {/* Expanding address fields */}
          <div
            className="grid transition-[grid-template-rows] duration-500 ease-out"
            style={{ gridTemplateRows: showAddressFields ? "1fr" : "0fr" }}
          >
            <div className="overflow-hidden">
              <div className={[
                "transition-opacity duration-500",
                showAddressFields ? "opacity-100" : "opacity-0",
              ].join(" ")}>

                {phase === "autofilled" && (
                  <div className="grid grid-cols-2 gap-2.5 animate-fade-in-up" style={{ animationDuration: "0.4s" }}>
                    {autoColonies.length > 1 ? (
                      <Select
                        compact
                        name="colony"
                        label="Colonia"
                        options={autoColonies.map((c) => ({ value: c, label: c }))}
                        placeholder="Selecciona tu colonia"
                        value={selectedColony}
                        onChange={(e) => setSelectedColony(e.target.value)}
                        error={errors.colony}
                        required
                        className="border-jade-600/30 bg-jade-600/5"
                      />
                    ) : autoColonies.length === 1 ? (
                      <>
                        <input type="hidden" name="colony" value={autoColonies[0]} />
                        <div className="space-y-0.5">
                          <span className="block text-xs font-medium text-obsidian-300">Colonia</span>
                          <div className="rounded-lg border border-jade-600/30 bg-jade-600/5 px-3 py-1.5 text-obsidian-200 text-sm flex items-center gap-1.5">
                            <svg className="h-3 w-3 text-jade-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            {autoColonies[0]}
                          </div>
                        </div>
                      </>
                    ) : (
                      <Input compact name="colony" label="Colonia" placeholder="Centro" error={errors.colony} required />
                    )}
                    <Input compact name="street" label="Calle" placeholder="Av. Principal" error={errors.street} required ref={streetRef} />
                    <Input compact name="number" label="Número" placeholder="123" error={errors.number} required />
                    <Input compact name="references" label="Referencias" placeholder="Entre calles, color de casa…" error={errors.references} />
                  </div>
                )}

                {phase === "manual" && (
                  <div className="grid grid-cols-2 gap-2.5 animate-fade-in-up" style={{ animationDuration: "0.4s" }}>
                    <Select compact name="state" label="Estado" options={mexicanStates} placeholder="Selecciona un estado" value={autoState} onChange={(e) => setAutoState(e.target.value)} error={errors.state} required />
                    <Input compact name="city" label="Ciudad" placeholder="Mérida" value={autoCity} onChange={(e) => setAutoCity(e.target.value)} error={errors.city} required />
                    <Input compact name="colony" label="Colonia" placeholder="Centro" error={errors.colony} required />
                    <Input compact name="street" label="Calle" placeholder="Av. Principal" error={errors.street} required ref={streetRef} />
                    <Input compact name="number" label="Número" placeholder="123" error={errors.number} required />
                    <Input compact name="references" label="Referencias" placeholder="Entre calles, color de casa…" error={errors.references} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Rental Event Details */}
      {hasRentalItems && (
        <SectionCard
          icon={
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          }
          title="Evento"
        >
          <p className="text-[11px] text-obsidian-500 -mt-0.5">
            Tu carrito incluye artículos de renta.
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <Input compact name="eventDate" label="Fecha del evento" type="date" error={errors.eventDate} required />
            <Input compact name="guestCount" label="Invitados" type="number" min="1" placeholder="30" error={errors.guestCount} required />
            <Input compact name="eventAddress" label="Dirección del evento" placeholder="Calle, número, colonia, ciudad" error={errors.eventAddress} required className="col-span-2" />
          </div>
        </SectionCard>
      )}

      {/* Payment */}
      <div className="rounded-xl border border-obsidian-700/50 bg-obsidian-900/40 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-ember-900/40 border border-ember-800/30 flex items-center justify-center shrink-0">
            <svg className="h-4 w-4 text-ember-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-heading font-semibold text-ember-300">Pago con PayCode</p>
            <p className="text-[11px] text-obsidian-500">Se procesará de forma segura al confirmar</p>
          </div>
          <svg className="h-3.5 w-3.5 text-fire-500 ml-auto shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
          </svg>
        </div>
      </div>

      <Button type="submit" size="md" className="w-full" isLoading={isSubmitting}>
        Confirmar Pedido
      </Button>
    </Form>
  );
}
