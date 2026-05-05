import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/Layout";
import { SITE, whatsappLink } from "@/lib/config";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · VaporHaus" },
      { name: "description", content: "Habla con nosotros por WhatsApp o email. Resolvemos dudas y aceptamos pedidos." },
      { property: "og:title", content: "Contacto · VaporHaus" },
      { property: "og:description", content: "Estamos a una calada de distancia." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <Layout>
      <section className="px-4 sm:px-6 pt-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-pink text-white p-10 sm:p-14">
            <h1 className="font-display text-5xl sm:text-6xl leading-none">Hablamos<br />por WhatsApp</h1>
            <p className="mt-6 opacity-90 max-w-md">La forma más rápida de pedir o resolver dudas. Te respondemos en minutos.</p>
            <a
              href={whatsappLink("Hola, quiero info sobre vapes")}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-cream text-blue px-6 py-3 font-semibold"
            >
              <MessageCircle className="w-4 h-4" /> Abrir chat
            </a>
          </div>

          <div className="rounded-3xl bg-blue text-cream p-10 sm:p-14 space-y-6">
            <h2 className="font-display text-3xl">Información</h2>
            <Item icon={<MapPin className="w-5 h-5" />} title="Zona">{SITE.city}</Item>
            <Item icon={<Clock className="w-5 h-5" />} title="Horario">Lun–Sáb · 10:00 – 22:00</Item>
            <Item icon={<Mail className="w-5 h-5" />} title="Email"><a className="underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></Item>
            <Item icon={<MessageCircle className="w-5 h-5" />} title="WhatsApp">+{SITE.whatsapp}</Item>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 mt-6">
        <div className="max-w-7xl mx-auto rounded-3xl bg-cream p-10 sm:p-14">
          <h2 className="font-display text-3xl text-blue">Mándanos un mensaje</h2>
          <form
            action={`mailto:${SITE.email}`}
            method="post"
            encType="text/plain"
            className="mt-6 grid sm:grid-cols-2 gap-4 max-w-2xl"
          >
            <input required name="nombre" placeholder="Tu nombre" className="rounded-full border border-border bg-card px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue" />
            <input required type="email" name="email" placeholder="Tu email" className="rounded-full border border-border bg-card px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue" />
            <textarea required name="mensaje" rows={5} placeholder="¿En qué te ayudamos?" className="sm:col-span-2 rounded-2xl border border-border bg-card px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue" />
            <button className="sm:col-span-2 justify-self-start rounded-full bg-blue text-cream px-6 py-3 font-semibold">Enviar</button>
          </form>
        </div>
      </section>
    </Layout>
  );
}

function Item({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-cream/10 grid place-items-center shrink-0">{icon}</div>
      <div>
        <div className="text-xs uppercase tracking-widest opacity-70">{title}</div>
        <div className="mt-1">{children}</div>
      </div>
    </div>
  );
}
