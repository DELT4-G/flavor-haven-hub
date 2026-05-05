import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { findProduct, PRODUCTS, blockBg, blockText } from "@/data/products";
import { whatsappLink } from "@/lib/config";

export const Route = createFileRoute("/producto/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} · VaporHaus` },
          { name: "description", content: loaderData.product.short },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:description", content: loaderData.product.short },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [{ title: "Producto · VaporHaus" }],
  }),
  notFoundComponent: () => (
    <Layout>
      <div className="px-4 py-32 text-center">
        <h1 className="font-display text-5xl text-blue">Producto no encontrado</h1>
        <Link to="/catalogo" className="mt-6 inline-block rounded-full bg-blue text-cream px-6 py-3">Ver catálogo</Link>
      </div>
    </Layout>
  ),
  errorComponent: () => (
    <Layout><div className="p-12 text-center">Error al cargar el producto.</div></Layout>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const others = PRODUCTS.filter((x) => x.slug !== p.slug);
  const [idx, setIdx] = useState(0);
  const alt = others[idx];

  return (
    <Layout>
      <section className="px-4 sm:px-6 pt-6">
        <div className={`max-w-7xl mx-auto rounded-3xl ${blockBg[p.color]} ${blockText[p.color]} p-8 sm:p-14`}>
          <div className="grid lg:grid-cols-3 gap-10 items-center">
            <div>
              <p className="uppercase tracking-widest text-xs opacity-80">{p.brand}</p>
              <h1 className="font-display text-5xl sm:text-6xl uppercase leading-none mt-2">{p.name}</h1>
              <p className="mt-4 text-sm opacity-80">11.5 FL OZ · {p.puffs.toLocaleString()} puffs</p>
              <h3 className="mt-10 text-xs uppercase tracking-widest opacity-70 font-sans">Ingredientes</h3>
              <p className="mt-3 text-sm opacity-90 leading-relaxed">{p.ingredients.join(", ")}.</p>
            </div>
            <div className="relative h-[460px]">
              <img src={p.image} alt={p.name} width={768} height={1024} className="absolute inset-0 m-auto max-h-full w-auto object-contain drop-shadow-2xl" />
            </div>
            <div>
              <h3 className="text-xs uppercase tracking-widest opacity-70 font-sans">Detalle del producto</h3>
              <p className="mt-3 text-sm opacity-90 leading-relaxed">{p.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <Stat k="Precio" v={`${p.price.toFixed(2)} €`} />
                <Stat k="Sabor" v={p.flavor} />
                <Stat k="Puffs" v={p.puffs.toLocaleString()} />
                <Stat k="Nicotina" v={`${p.nicotine} mg/ml`} />
                <Stat k="Batería" v={`${p.battery} mAh`} />
                <Stat k="Tipo" v={p.type} />
              </div>
              <a
                href={whatsappLink(`Hola, quiero pedir el ${p.name} sabor ${p.flavor} — ${p.price.toFixed(2)} €`)}
                target="_blank"
                rel="noopener"
                className="mt-8 block text-center rounded-full bg-cream text-blue py-4 font-semibold text-base hover:opacity-90"
              >
                Pedir por WhatsApp
              </a>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-cream/15 flex items-center justify-center gap-6">
            <button onClick={() => setIdx((i) => (i - 1 + others.length) % others.length)} className="w-10 h-10 rounded-full border border-cream/30 grid place-items-center hover:bg-white/10">
              <ChevronLeft />
            </button>
            <div className="text-center">
              <p className="text-xs opacity-70">{idx + 1}/{others.length}</p>
              <Link to="/producto/$slug" params={{ slug: alt.slug }} className="font-display text-xl uppercase mt-1 inline-block">{alt.flavor}</Link>
            </div>
            <button onClick={() => setIdx((i) => (i + 1) % others.length)} className="w-10 h-10 rounded-full border border-cream/30 grid place-items-center hover:bg-white/10">
              <ChevronRight />
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl text-blue mb-6">También te puede gustar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {others.slice(0, 3).map((o) => (
              <Link key={o.slug} to="/producto/$slug" params={{ slug: o.slug }} className={`${blockBg[o.color]} ${blockText[o.color]} rounded-2xl p-6 flex items-center gap-4 hover:opacity-95`}>
                <img src={o.image} alt="" width={768} height={1024} loading="lazy" className="w-24 h-32 object-contain" />
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-70">{o.brand}</p>
                  <h3 className="font-display text-2xl">{o.name}</h3>
                  <p className="text-sm opacity-85">{o.flavor}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-t border-cream/20 pt-2">
      <div className="text-[10px] uppercase tracking-widest opacity-60">{k}</div>
      <div className="mt-1 font-medium capitalize">{v}</div>
    </div>
  );
}
