import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Zap, Leaf, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/Layout";
import { CircleBadge } from "@/components/CircleBadge";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, blockBg, blockText, FLAVOR_CATEGORIES } from "@/data/products";
import { whatsappLink } from "@/lib/config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VaporHaus · Vapes premium con buen rollo" },
      { name: "description", content: "Tienda de reventa de vapes. Sabores frutales, mentolados y postres. Recomendador y pedidos por WhatsApp." },
      { property: "og:title", content: "VaporHaus" },
      { property: "og:description", content: "Vapes premium · Reventa con buen rollo" },
    ],
  }),
  component: Home,
});

const HERO = PRODUCTS.slice(0, 3);

function Home() {
  return (
    <Layout>
      <Hero />
      <FeaturedProduct />
      <Categories />
      <FlavorTeaser />
      <WhyUs />
      <CTAStrip />
    </Layout>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  const p = HERO[i];
  const next = () => setI((v) => (v + 1) % HERO.length);
  const prev = () => setI((v) => (v - 1 + HERO.length) % HERO.length);

  return (
    <section className="px-4 sm:px-6 pt-6">
      <div className={`relative max-w-7xl mx-auto rounded-3xl overflow-hidden ${blockBg[p.color]} ${blockText[p.color]}`}>
        <div className="grid md:grid-cols-2 gap-6 items-center min-h-[520px] p-6 sm:p-12">
          <div className="relative h-[380px] md:h-[480px]">
            <img
              src={p.image}
              alt={p.name}
              width={768}
              height={1024}
              className="absolute inset-0 m-auto max-h-full w-auto object-contain drop-shadow-2xl"
            />
          </div>
          <div className="md:pl-6">
            <p className="uppercase tracking-widest text-xs opacity-80 mb-3">Nueva colección</p>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
              {p.name}
              <br />
              <span className="opacity-90">{p.flavor}</span>
            </h1>
            <p className="mt-6 max-w-md opacity-90 text-base sm:text-lg leading-relaxed">{p.short}</p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                to="/producto/$slug"
                params={{ slug: p.slug }}
                className="inline-flex items-center gap-2 rounded-full bg-cream text-blue px-6 py-3 font-semibold hover:opacity-90"
              >
                Descubrir <Sparkles className="w-4 h-4" />
              </Link>
              <a
                href={whatsappLink(`Hola, quiero pedir el ${p.name}`)}
                className="rounded-full border-2 border-white/60 px-6 py-3 font-semibold hover:bg-white/10"
              >
                Pedir
              </a>
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute right-10 top-10">
          <CircleBadge />
        </div>

        <button onClick={prev} aria-label="Anterior" className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 grid place-items-center">
          <ChevronLeft />
        </button>
        <button onClick={next} aria-label="Siguiente" className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 grid place-items-center">
          <ChevronRight />
        </button>

        <div className="absolute bottom-5 right-6 flex items-center gap-3 text-sm font-mono opacity-90">
          <span>0{i + 1}</span>
          <div className="w-24 h-px bg-current opacity-40" />
          <span>0{HERO.length}</span>
        </div>
      </div>
    </section>
  );
}

function FeaturedProduct() {
  const p = PRODUCTS[1];
  return (
    <section className="px-4 sm:px-6 mt-6">
      <div className={`max-w-7xl mx-auto rounded-3xl ${blockBg.blue} ${blockText.blue} p-8 sm:p-14 grid lg:grid-cols-3 gap-10 items-center`}>
        <div>
          <h2 className="font-display text-4xl sm:text-5xl uppercase leading-none">{p.name}</h2>
          <p className="mt-4 text-sm opacity-80">{p.puffs.toLocaleString()} puffs · {p.nicotine} mg/ml</p>
          <h3 className="mt-10 text-xs uppercase tracking-widest opacity-70 font-sans">Ingredientes</h3>
          <p className="mt-3 text-sm opacity-90 leading-relaxed">{p.ingredients.join(", ")}.</p>
        </div>
        <div className="relative h-[420px]">
          <img src={p.image} alt={p.name} width={768} height={1024} loading="lazy" className="absolute inset-0 m-auto max-h-full w-auto object-contain drop-shadow-2xl" />
        </div>
        <div>
          <h3 className="text-xs uppercase tracking-widest opacity-70 font-sans">Detalle del producto</h3>
          <p className="mt-3 text-sm opacity-90 leading-relaxed">{p.description}</p>
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <Stat k="Puffs" v={p.puffs.toLocaleString()} />
            <Stat k="Sabor" v={p.flavor} />
            <Stat k="Batería" v={`${p.battery} mAh`} />
            <Stat k="Nicotina" v={`${p.nicotine} mg/ml`} />
          </div>
          <a
            href={whatsappLink(`Hola, quiero pedir el ${p.name} — ${p.price.toFixed(2)} €`)}
            className="mt-8 block text-center rounded-full bg-cream text-blue py-3 font-semibold hover:opacity-90"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-t border-cream/20 pt-2">
      <div className="text-[10px] uppercase tracking-widest opacity-60">{k}</div>
      <div className="mt-1 font-medium">{v}</div>
    </div>
  );
}

function Categories() {
  const items = [
    { label: "Desechables", desc: "Listo para usar, sin recargas", color: "coral" as const },
    { label: "Pods recargables", desc: "Más sostenibles y personalizables", color: "orange" as const },
    { label: "Líquidos", desc: "Para tu mod favorito", color: "blue" as const },
    { label: "Accesorios", desc: "Cargadores, fundas y resistencias", color: "grape" as const },
  ];
  return (
    <section className="px-4 sm:px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-3xl sm:text-4xl">Categorías</h2>
          <Link to="/catalogo" className="text-sm font-medium underline">Ver catálogo</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((c) => (
            <Link
              key={c.label}
              to="/catalogo"
              className={`${blockBg[c.color]} ${blockText[c.color]} rounded-3xl p-6 h-44 flex flex-col justify-between hover:opacity-95`}
            >
              <h3 className="font-display text-2xl leading-tight">{c.label}</h3>
              <p className="text-sm opacity-85">{c.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlavorTeaser() {
  return (
    <section className="px-4 sm:px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display text-3xl sm:text-4xl">Sabores favoritos</h2>
          <Link to="/sabores" className="text-sm font-medium underline">Todos los sabores</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCTS.slice(0, 3).map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const f = [
    { i: <Zap className="w-6 h-6" />, t: "Envío en 24-48h", d: "Stock real, sale el mismo día." },
    { i: <ShieldCheck className="w-6 h-6" />, t: "Producto auténtico", d: "Lotes verificados y trazabilidad." },
    { i: <Leaf className="w-6 h-6" />, t: "Sabores premium", d: "Selección curada por nuestro equipo." },
  ];
  return (
    <section className="px-4 sm:px-6 mt-16">
      <div className={`max-w-7xl mx-auto rounded-3xl ${blockBg.coral} ${blockText.coral} p-8 sm:p-14 grid lg:grid-cols-2 gap-10 items-center`}>
        <div>
          <h2 className="font-display text-4xl sm:text-5xl">Por qué nos eligen</h2>
          <p className="mt-4 opacity-90 max-w-md">Somos vapers comprando para vapers: solo vendemos lo que nosotros usaríamos.</p>
          <div className="mt-8 grid sm:grid-cols-3 gap-5">
            {f.map((x) => (
              <div key={x.t}>
                <div className="w-10 h-10 rounded-full bg-white/15 grid place-items-center mb-3">{x.i}</div>
                <h3 className="font-display text-lg">{x.t}</h3>
                <p className="text-sm opacity-80 mt-1">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <svg viewBox="0 0 300 360" className="w-full max-w-xs mx-auto opacity-90" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="80" y="40" width="140" height="280" rx="20" />
            <path d="M80 100 Q 150 80 220 100" />
            <path d="M80 260 Q 150 240 220 260" />
            {FLAVOR_CATEGORIES.slice(0, 5).map((_, idx) => {
              const cx = 110 + (idx % 3) * 40;
              const cy = 150 + Math.floor(idx / 3) * 60;
              return <circle key={idx} cx={cx} cy={cy} r="18" />;
            })}
            <text x="150" y="335" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="Fraunces, serif">20mg / ml</text>
          </svg>
        </div>
      </div>
    </section>
  );
}

function CTAStrip() {
  return (
    <section className="px-4 sm:px-6 mt-16">
      <div className={`max-w-7xl mx-auto rounded-3xl ${blockBg.pink} ${blockText.pink} p-10 sm:p-14 text-center`}>
        <h2 className="font-display text-4xl sm:text-5xl max-w-2xl mx-auto leading-tight">
          ¿No sabes cuál elegir?
        </h2>
        <p className="mt-4 opacity-90">Responde 4 preguntas y te recomendamos tu vape ideal.</p>
        <Link to="/recomendador" className="mt-8 inline-block rounded-full bg-cream text-blue px-8 py-3 font-semibold">
          Probar el recomendador
        </Link>
      </div>
    </section>
  );
}
