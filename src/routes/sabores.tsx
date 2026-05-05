import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { FLAVOR_CATEGORIES, PRODUCTS, blockBg, blockText } from "@/data/products";

export const Route = createFileRoute("/sabores")({
  head: () => ({
    meta: [
      { title: "Sabores · VaporHaus" },
      { name: "description", content: "Catálogo de sabores: frutales, mentolados, postres, bebidas y tabaco." },
      { property: "og:title", content: "Sabores · VaporHaus" },
      { property: "og:description", content: "Encuentra el sabor que más te gusta." },
    ],
  }),
  component: Sabores,
});

function Sabores() {
  return (
    <Layout>
      <section className="px-4 sm:px-6 pt-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-display text-5xl sm:text-6xl text-blue">Sabores</h1>
          <p className="mt-3 text-muted-foreground max-w-xl">Elige tu familia favorita. Cada bloque te lleva al catálogo filtrado.</p>
        </div>
      </section>

      <section className="px-4 sm:px-6 mt-10">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FLAVOR_CATEGORIES.map((f) => {
            const count = PRODUCTS.filter((p) => p.flavorTag === f.tag).length;
            return (
              <Link
                key={f.tag}
                to="/catalogo"
                search={{ sabor: f.tag }}
                className={`${blockBg[f.color]} ${blockText[f.color]} rounded-3xl p-8 h-60 flex flex-col justify-between hover:opacity-95 transition`}
              >
                <span className="text-xs uppercase tracking-widest opacity-80">{count} producto{count !== 1 && "s"}</span>
                <div>
                  <h2 className="font-display text-4xl">{f.label}</h2>
                  <p className="mt-2 text-sm opacity-85">{f.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="px-4 sm:px-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl text-blue mb-4">Todos los sabores</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((p) => (
              <Link
                key={p.slug}
                to="/producto/$slug"
                params={{ slug: p.slug }}
                className={`${blockBg[p.color]} ${blockText[p.color]} rounded-2xl p-5 flex items-center gap-4 hover:opacity-95`}
              >
                <img src={p.image} alt="" width={768} height={1024} loading="lazy" className="w-20 h-24 object-contain" />
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-70">{p.brand}</p>
                  <h3 className="font-display text-xl">{p.flavor}</h3>
                  <p className="text-sm opacity-85">{p.puffs.toLocaleString()} puffs</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
