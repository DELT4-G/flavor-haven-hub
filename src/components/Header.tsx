import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { SITE } from "@/lib/config";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/sabores", label: "Sabores" },
  { to: "/recomendador", label: "Recomendador" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl tracking-tight text-blue">
          <span className="inline-block w-7 h-7 rounded-full bg-blue text-cream grid place-items-center text-xs font-bold">VH</span>
          {SITE.name}
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 hover:text-blue transition"
              activeProps={{ className: "text-blue font-semibold" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button aria-label="Buscar" className="hidden sm:grid w-9 h-9 place-items-center rounded-full hover:bg-muted">
            <Search className="w-4 h-4" />
          </button>
          <button
            className="md:hidden grid w-9 h-9 place-items-center rounded-full hover:bg-muted"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menú"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-cream">
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium"
                activeProps={{ className: "text-blue font-semibold" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
