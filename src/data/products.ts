import raspberry from "@/assets/vape-raspberry.png";
import strawberry from "@/assets/vape-strawberry.png";
import cola from "@/assets/vape-cola.png";
import mint from "@/assets/vape-mint.png";
import mango from "@/assets/vape-mango.png";
import grape from "@/assets/vape-grape.png";
import watermelon from "@/assets/vape-watermelon.png";
import blueberry from "@/assets/vape-blueberry.png";
import mojito from "@/assets/vape-mojito.png";
import tobacco from "@/assets/vape-tobacco.png";
import peach from "@/assets/vape-peach.png";
import donut from "@/assets/vape-donut.png";

export type BlockColor =
  | "pink" | "blue" | "coral" | "orange" | "mint" | "grape"
  | "lime" | "sky" | "peach" | "mocha" | "sun" | "magenta";

export type FlavorTag = "frutal" | "mentol" | "postre" | "tabaco" | "bebida";

export type Product = {
  slug: string;
  name: string;
  brand: string;
  flavor: string;
  flavorTag: FlavorTag;
  type: "desechable" | "pod" | "liquido";
  puffs: number;
  nicotine: number; // mg/ml
  battery: number; // mAh
  price: number;
  color: BlockColor;
  image: string;
  short: string;
  description: string;
  ingredients: string[];
  level: "principiante" | "intermedio" | "experto";
};

export const PRODUCTS: Product[] = [
  {
    slug: "raspberry-lemonade",
    name: "Raspberry Lemonade",
    brand: "VaporBerry",
    flavor: "Frambuesa & Limonada",
    flavorTag: "frutal",
    type: "desechable",
    puffs: 9000,
    nicotine: 20,
    battery: 650,
    price: 14.9,
    color: "pink",
    image: raspberry,
    short: "Frambuesa dulce y limonada ácida en una calada refrescante.",
    description:
      "Una explosión jugosa de frambuesas maduras equilibrada con limonada cítrica. La calada perfecta para el verano, con un acabado limpio y burbujeante.",
    ingredients: ["VG/PG 50/50", "Sales de nicotina", "Aroma natural de frambuesa", "Esencia de limón"],
    level: "principiante",
  },
  {
    slug: "strawberry-vanilla",
    name: "Strawberry Vanilla",
    brand: "RevRed",
    flavor: "Fresa & Vainilla",
    flavorTag: "postre",
    type: "desechable",
    puffs: 8000,
    nicotine: 20,
    battery: 600,
    price: 13.9,
    color: "coral",
    image: strawberry,
    short: "Fresas frescas con un toque cremoso de vainilla bourbon.",
    description:
      "Fresas dulces de campo y vainilla cremosa se unen en un postre líquido suave y reconfortante. Cremoso pero sin empalagar.",
    ingredients: ["VG/PG 60/40", "Sales de nicotina", "Aroma de fresa", "Vainilla bourbon"],
    level: "intermedio",
  },
  {
    slug: "root-beer",
    name: "Root Beer",
    brand: "VaporHaus",
    flavor: "Cerveza de raíz",
    flavorTag: "bebida",
    type: "desechable",
    puffs: 10000,
    nicotine: 20,
    battery: 700,
    price: 15.9,
    color: "orange",
    image: cola,
    short: "El clásico americano: dulce, especiado y burbujeante.",
    description:
      "Notas de zarzaparrilla, anís y vainilla con la espuma característica de un root beer recién servido. Nostalgia en cada calada.",
    ingredients: ["VG/PG 50/50", "Sales de nicotina", "Extracto de zarzaparrilla", "Anís", "Vainilla"],
    level: "intermedio",
  },
  {
    slug: "arctic-mint",
    name: "Arctic Mint",
    brand: "IceLab",
    flavor: "Menta polar",
    flavorTag: "mentol",
    type: "desechable",
    puffs: 9000,
    nicotine: 20,
    battery: 650,
    price: 14.9,
    color: "mint",
    image: mint,
    short: "Menta intensa con un golpe de hielo que despeja al instante.",
    description:
      "Menta fresca destilada con un toque de eucalipto y un acabado frío que limpia el paladar. Para los que buscan el chute helado puro.",
    ingredients: ["VG/PG 70/30", "Sales de nicotina", "Aceite de menta", "Mentol natural"],
    level: "experto",
  },
  {
    slug: "mango-pineapple",
    name: "Mango Pineapple",
    brand: "Retroffeine",
    flavor: "Mango & Piña",
    flavorTag: "frutal",
    type: "desechable",
    puffs: 8000,
    nicotine: 20,
    battery: 600,
    price: 13.5,
    color: "orange",
    image: mango,
    short: "Trópico puro: mango maduro y piña jugosa con un toque ácido.",
    description:
      "Una piña colada sin alcohol: mango carnoso, piña dorada y un fondo ligero de coco. Te transporta directo a la playa.",
    ingredients: ["VG/PG 60/40", "Sales de nicotina", "Aroma de mango", "Aroma de piña"],
    level: "principiante",
  },
  {
    slug: "grape-ice",
    name: "Grape Ice",
    brand: "Prince",
    flavor: "Uva & Hielo",
    flavorTag: "mentol",
    type: "desechable",
    puffs: 10000,
    nicotine: 20,
    battery: 700,
    price: 15.5,
    color: "grape",
    image: grape,
    short: "Uva morada con un final helado limpio y largo.",
    description:
      "Uvas Concord oscuras y dulces con un escarche helado al final. La combinación de fruta y mentol más vendida del catálogo.",
    ingredients: ["VG/PG 50/50", "Sales de nicotina", "Aroma de uva Concord", "Mentol"],
    level: "intermedio",
  },
];

export const blockBg: Record<BlockColor, string> = {
  pink: "bg-pink",
  blue: "bg-blue",
  coral: "bg-coral",
  orange: "bg-orange",
  mint: "bg-mint",
  grape: "bg-grape",
};

export const blockText: Record<BlockColor, string> = {
  pink: "text-white",
  blue: "text-cream",
  coral: "text-white",
  orange: "text-white",
  mint: "text-white",
  grape: "text-cream",
};

export const FLAVOR_CATEGORIES: { tag: FlavorTag; label: string; color: BlockColor; desc: string }[] = [
  { tag: "frutal", label: "Frutales", color: "pink", desc: "Frambuesa, mango, fresa, uva..." },
  { tag: "mentol", label: "Mentolados", color: "mint", desc: "Frescor polar, hielo y menta." },
  { tag: "postre", label: "Postres", color: "coral", desc: "Vainilla, cremas, galleta." },
  { tag: "bebida", label: "Bebidas", color: "orange", desc: "Cola, root beer, mojito." },
  { tag: "tabaco", label: "Tabaco", color: "blue", desc: "Notas clásicas y maduras." },
];

export function findProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
