import { useEffect, useState } from "react";

const KEY = "vh-age-ok";

export function AgeGate() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[oklch(0.15_0.05_260/0.85)] backdrop-blur-sm p-4">
      <div className="bg-cream max-w-md w-full rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
        <div className="mx-auto mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-pink text-white font-display text-3xl">
          18+
        </div>
        <h2 className="text-3xl sm:text-4xl text-blue mb-3">¿Eres mayor de edad?</h2>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          Este sitio vende productos con nicotina destinados exclusivamente a personas mayores de 18 años.
          La nicotina es una sustancia adictiva.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              localStorage.setItem(KEY, "1");
              setOpen(false);
            }}
            className="flex-1 rounded-full bg-blue text-cream py-3 font-semibold hover:opacity-90 transition"
          >
            Sí, tengo 18+
          </button>
          <a
            href="https://www.google.com"
            className="flex-1 rounded-full border-2 border-blue text-blue py-3 font-semibold hover:bg-blue hover:text-cream transition"
          >
            Salir
          </a>
        </div>
      </div>
    </div>
  );
}
