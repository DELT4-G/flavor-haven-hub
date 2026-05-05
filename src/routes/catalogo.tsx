import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, FLAVOR_CATEGORIES, type FlavorTag } from "@/data/products";
import { Search } from "lucide-react";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo · VaporHaus" },
      { name: "description", content: "Explora todos nuestros vapes: desechables, pods y líquidos. Filtra por sabor, marca y nicotina." },
      { property: "og:title", content: "Catálogo · VaporHaus" },
      { property: "og:description", content: "Todos nuestros vapes en un mismo sitio." },
    ],
  }),
  component: Catalogo,
});

function Catalogo() {
  const search = Route.useSearch() as { sabor?: FlavorTag };
  const [q, setQ] = useState("");
  const [tag, setTag] = useState<FlavorTag | "todos">(search.sabor ?? "todos");
  const [type, setType] = useState<"todos" | "desechable" | "pod" | "liquido">("todos");
  const brands = useMemo(() => Array.from(new Set(PRODUCTS.map((p) => p.brand))), []);
  const [brand, setBrand] = useState<string>("todas");

  const items = PRODUCTS.filter((p) => {
    if (tag !== "todos" && p.flavorTag !== tag) return false;
    if (type !== "todos" && p.type !== type) return false;
    if (brand !== "todas" && p.brand !== brand) return false;
    if (q && !(`${p.name} ${p.flavor} ${p.brand}`.toLowerCase().includes(q.toLowerCase()))) return false;
    return true;
  });

  return (
    <Layout>
      <section className="px-4 sm:px-6 pt-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-5xl sm:text-6xl text-blue">Catálogo</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">Filtra por sabor, marca o tipo. Pide por WhatsApp en un clic.</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 mt-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar..."
                className="w-full pl-9 pr-3 py-2.5 rounded-full bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-blue"
              />
            </div>

            <FilterGroup label="Sabor">
              <Chip active={tag === "todos"} onClick={() => setTag("todos")}>Todos</Chip>
              {FLAVOR_CATEGORIES.map((f) => (
                <Chip key={f.tag} active={tag === f.tag} onClick={() => setTag(f.tag)}>{f.label}</Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Tipo">
              {(["todos", "desechable", "pod", "liquido"] as const).map((t) => (
                <Chip key={t} active={type === t} onClick={() => setType(t)}>{t}</Chip>
              ))}
            </FilterGroup>

            <FilterGroup label="Marca">
              <Chip active={brand === "todas"} onClick={() => setBrand("todas")}>Todas</Chip>
              {brands.map((b) => (
                <Chip key={b} active={brand === b} onClick={() => setBrand(b)}>{b}</Chip>
              ))}
            </FilterGroup>
          </aside>

          <div>
            <p className="text-sm text-muted-foreground mb-4">{items.length} producto{items.length !== 1 && "s"}</p>
            {items.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
                No hay productos con esos filtros.
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {items.map((p) => <ProductCard key={p.slug} p={p} />)}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition capitalize ${
        active ? "bg-blue text-cream border-blue" : "bg-card border-border hover:border-blue"
      }`}
    >
      {children}
    </button>
  );
}
