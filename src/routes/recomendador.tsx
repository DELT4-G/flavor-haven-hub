import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { PRODUCTS, FLAVOR_CATEGORIES, blockBg, blockText, type FlavorTag, type Product } from "@/data/products";
import { whatsappLink } from "@/lib/config";

export const Route = createFileRoute("/recomendador")({
  head: () => ({
    meta: [
      { title: "Recomendador · VaporHaus" },
      { name: "description", content: "Responde 4 preguntas y te recomendamos el vape ideal." },
      { property: "og:title", content: "Recomendador de vapes · VaporHaus" },
      { property: "og:description", content: "Encuentra tu vape ideal en menos de un minuto." },
    ],
  }),
  component: Recomendador,
});

type Answers = {
  level?: "principiante" | "intermedio" | "experto";
  flavor?: FlavorTag;
  intensity?: "suave" | "fuerte";
  duration?: "corta" | "larga";
};

const QUESTIONS = [
  {
    key: "level" as const,
    title: "¿Cuál es tu experiencia?",
    options: [
      { v: "principiante", label: "Principiante", desc: "Llevo poco vapeando" },
      { v: "intermedio", label: "Intermedio", desc: "Ya he probado varios" },
      { v: "experto", label: "Experto", desc: "Sé exactamente lo que quiero" },
    ],
  },
  {
    key: "flavor" as const,
    title: "¿Qué sabor te apetece?",
    options: FLAVOR_CATEGORIES.map((f) => ({ v: f.tag, label: f.label, desc: f.desc })),
  },
  {
    key: "intensity" as const,
    title: "¿Cómo prefieres la calada?",
    options: [
      { v: "suave", label: "Suave", desc: "Cremosa, agradable" },
      { v: "fuerte", label: "Fuerte", desc: "Con golpe de garganta" },
    ],
  },
  {
    key: "duration" as const,
    title: "¿Cuánto quieres que te dure?",
    options: [
      { v: "corta", label: "Hasta 8.000 puffs", desc: "Suficiente para una semana" },
      { v: "larga", label: "10.000+ puffs", desc: "Para no preocuparme en mucho tiempo" },
    ],
  },
];

function score(p: Product, a: Answers) {
  let s = 0;
  if (a.level && p.level === a.level) s += 3;
  if (a.flavor && p.flavorTag === a.flavor) s += 4;
  if (a.intensity === "fuerte" && p.flavorTag === "mentol") s += 1;
  if (a.intensity === "suave" && (p.flavorTag === "postre" || p.flavorTag === "frutal")) s += 1;
  if (a.duration === "larga" && p.puffs >= 10000) s += 2;
  if (a.duration === "corta" && p.puffs < 10000) s += 1;
  return s;
}

function Recomendador() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const done = step >= QUESTIONS.length;
  const q = QUESTIONS[step];

  const recos = done
    ? [...PRODUCTS].sort((x, y) => score(y, a) - score(x, a)).slice(0, 3)
    : [];

  const colors = ["pink", "coral", "orange", "grape"] as const;
  const c = colors[step % colors.length];

  return (
    <Layout>
      <section className="px-4 sm:px-6 pt-6">
        <div className={`max-w-5xl mx-auto rounded-3xl ${done ? blockBg.blue : blockBg[c]} ${done ? blockText.blue : blockText[c]} min-h-[520px] p-8 sm:p-14 flex flex-col`}>
          {!done ? (
            <>
              <div className="flex items-center justify-between text-xs uppercase tracking-widest opacity-80">
                <span>Pregunta {step + 1}/{QUESTIONS.length}</span>
                <button onClick={() => { setA({}); setStep(0); }} className="underline">Reiniciar</button>
              </div>
              <h1 className="font-display text-4xl sm:text-5xl mt-6 max-w-2xl">{q.title}</h1>

              <div className="mt-10 grid sm:grid-cols-2 gap-3 flex-1">
                {q.options.map((o) => (
                  <button
                    key={o.v}
                    onClick={() => {
                      setA({ ...a, [q.key]: o.v as never });
                      setStep((s) => s + 1);
                    }}
                    className="text-left rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur p-5 transition"
                  >
                    <div className="font-display text-xl">{o.label}</div>
                    <div className="text-sm opacity-80 mt-1">{o.desc}</div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-2">
                {QUESTIONS.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full flex-1 ${i <= step ? "bg-cream" : "bg-cream/20"}`} />
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="uppercase tracking-widest text-xs opacity-80">Tu match</p>
              <h1 className="font-display text-5xl sm:text-6xl mt-2">Estos son tu vapes ideales</h1>
              <p className="mt-3 opacity-85 max-w-xl">Basado en tus respuestas, esto es lo que más te va a encajar.</p>

              <div className="mt-10 grid sm:grid-cols-3 gap-4 flex-1">
                {recos.map((p, i) => (
                  <div key={p.slug} className={`${blockBg[p.color]} ${blockText[p.color]} rounded-2xl p-5 flex flex-col`}>
                    <div className="text-xs opacity-70 uppercase tracking-widest">#{i + 1} match</div>
                    <div className="flex-1 grid place-items-center my-4">
                      <img src={p.image} alt={p.name} width={768} height={1024} loading="lazy" className="max-h-44 w-auto object-contain" />
                    </div>
                    <h3 className="font-display text-xl">{p.name}</h3>
                    <p className="text-sm opacity-85">{p.flavor}</p>
                    <div className="mt-3 flex gap-2">
                      <Link to="/producto/$slug" params={{ slug: p.slug }} className="flex-1 rounded-full bg-white/15 py-2 text-center text-sm">Ver</Link>
                      <a href={whatsappLink(`Hola, me ha recomendado el ${p.name}, quiero pedirlo`)} className="flex-1 rounded-full bg-cream text-blue py-2 text-center text-sm font-semibold">Pedir</a>
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => { setA({}); setStep(0); }} className="mt-8 self-start underline text-sm">Hacer el test de nuevo</button>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
