import { whatsappLink } from "@/lib/config";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Hola, vengo de la web 👋")}
      target="_blank"
      rel="noopener"
      className="fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-[oklch(0.65_0.18_145)] text-white grid place-items-center shadow-xl hover:scale-105 transition"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
