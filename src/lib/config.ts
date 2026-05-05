export const SITE = {
  name: "VaporHaus",
  tagline: "Vapes premium · Reventa con buen rollo",
  whatsapp: "1234567890", // <- cambia por tu número con código de país
  email: "hola@vaporhaus.shop",
  city: "Madrid · Envíos a toda España",
};

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}
