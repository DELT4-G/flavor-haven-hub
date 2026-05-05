import { Link } from "@tanstack/react-router";
import { SITE, whatsappLink } from "@/lib/config";
import { Instagram, MessageCircle, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-blue text-cream mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-4 gap-10">
        <div>
          <h3 className="font-display text-2xl mb-3">{SITE.name}</h3>
          <p className="text-sm opacity-80 leading-relaxed">{SITE.tagline}</p>
          <p className="text-xs opacity-60 mt-3">{SITE.city}</p>
        </div>
        <div>
          <h4 className="font-display text-lg mb-3">Tienda</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/catalogo">Catálogo</Link></li>
            <li><Link to="/sabores">Sabores</Link></li>
            <li><Link to="/recomendador">Recomendador</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-3">Ayuda</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/contacto">Contacto</Link></li>
            <li><a href={whatsappLink("Hola, tengo una duda")}>WhatsApp</a></li>
            <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-3">Síguenos</h4>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 grid place-items-center rounded-full bg-cream/10 hover:bg-cream/20"><Instagram className="w-4 h-4" /></a>
            <a href={whatsappLink("Hola")} className="w-10 h-10 grid place-items-center rounded-full bg-cream/10 hover:bg-cream/20"><MessageCircle className="w-4 h-4" /></a>
            <a href={`mailto:${SITE.email}`} className="w-10 h-10 grid place-items-center rounded-full bg-cream/10 hover:bg-cream/20"><Mail className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 text-xs opacity-70 flex flex-col md:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} {SITE.name}. Solo +18. La nicotina es adictiva.</span>
          <span>Producto destinado a fumadores adultos. No recomendado a embarazadas ni menores.</span>
        </div>
      </div>
    </footer>
  );
}
