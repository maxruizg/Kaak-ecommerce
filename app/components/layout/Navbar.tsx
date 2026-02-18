import { Link, useLocation } from "@remix-run/react";
import { cn } from "~/lib/utils";
import { useMobileMenu } from "~/hooks/useMobileMenu";
import { Icon } from "~/components/ui/Icon";

const navLinks = [
  { href: "/productos", label: "Productos" },
  { href: "/eventos", label: "Eventos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

interface NavbarProps {
  cartItemCount?: number;
}

export function Navbar({ cartItemCount = 0 }: NavbarProps) {
  const { isOpen, toggle, close, menuRef } = useMobileMenu();
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-obsidian-950/95 backdrop-blur-md border-b border-obsidian-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 logo-fire-hover" onClick={close}>
            <span className="font-display text-2xl md:text-3xl font-bold text-fire-500 tracking-wider">
              K'Á-AK
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-heading font-medium tracking-wide rounded-lg transition-colors",
                  location.pathname.startsWith(link.href)
                    ? "text-fire-400 bg-fire-500/10"
                    : "text-obsidian-300 hover:text-white hover:bg-obsidian-800"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <Link
              to="/carrito"
              className="relative p-2 text-obsidian-300 hover:text-fire-400 transition-colors"
              aria-label={`Carrito (${cartItemCount} artículos)`}
            >
              <Icon name="cart" className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-fire-500 text-white text-xs font-bold rounded-full">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggle}
              className="md:hidden p-2 text-obsidian-300 hover:text-white transition-colors"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
            >
              <Icon name={isOpen ? "close" : "menu"} className="w-6 h-6" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-obsidian-950 border-t border-obsidian-800 animate-fade-in-down"
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={close}
                className={cn(
                  "block px-4 py-3 text-base font-heading font-medium rounded-lg transition-colors",
                  location.pathname.startsWith(link.href)
                    ? "text-fire-400 bg-fire-500/10"
                    : "text-obsidian-300 hover:text-white hover:bg-obsidian-800"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
