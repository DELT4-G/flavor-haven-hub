import { Link } from "@tanstack/react-router";
import { type Product, blockBg, blockText } from "@/data/products";
import { whatsappLink } from "@/lib/config";

export function ProductCard({ p }: { p: Product }) {
  return (
    <div className={`group rounded-3xl overflow-hidden ${blockBg[p.color]} ${blockText[p.color]} flex flex-col`}>
      <Link to="/producto/$slug" params={{ slug: p.slug }} className="block p-6 pb-0 aspect-[4/5] relative">
        <div className="absolute inset-0 grid place-items-center p-4">
          <img
            src={p.image}
            alt={p.name}
            width={768}
            height={1024}
            loading="lazy"
            className="max-h-full w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition"
          />
        </div>
      </Link>
      <div className="p-6 pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{p.name}</h3>
          <span className="font-semibold whitespace-nowrap">{p.price.toFixed(2)} €</span>
        </div>
        <p className="text-sm opacity-80 mt-1">{p.flavor} · {p.puffs.toLocaleString()} puffs</p>
        <div className="mt-4 flex gap-2">
          <Link
            to="/producto/$slug"
            params={{ slug: p.slug }}
            className="flex-1 text-center rounded-full bg-white/15 hover:bg-white/25 backdrop-blur py-2 text-sm font-medium"
          >
            Ver
          </Link>
          <a
            href={whatsappLink(`Hola, quiero pedir el ${p.name} (${p.flavor}) — ${p.price.toFixed(2)} €`)}
            target="_blank"
            rel="noopener"
            className="flex-1 text-center rounded-full bg-cream text-blue py-2 text-sm font-semibold hover:opacity-90"
          >
            Pedir
          </a>
        </div>
      </div>
    </div>
  );
}
