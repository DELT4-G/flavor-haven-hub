# Plan: Tienda de reventa de vapes (catálogo + WhatsApp)

Sitio multi-página con estética en bloques de colores vibrantes y tipografía serif retro, igual a la referencia de SunSip. Sin checkout: cada producto enlaza a WhatsApp con un mensaje pre-rellenado.

## Páginas (rutas separadas)

- `/` — **Home**
  - Modal de verificación de edad (18+) al entrar, persistido en localStorage
  - Header con logo, navegación (Inicio, Catálogo, Sabores, Recomendador, Contacto), iconos de búsqueda y carrito (decorativo → WhatsApp)
  - Hero carrusel estilo referencia: bloque rosa con un vape destacado a la izquierda, título serif grande "Conoce nuestro vape estrella", descripción y badge circular "Ver ahora". Indicador 01—03.
  - Bloque azul de producto destacado: nombre grande, imagen central, ficha (puffs, nicotina, sabor, batería) y botón "Pedir por WhatsApp"
  - Grid de bloques de colores (coral, naranja, azul) tipo mosaico mostrando categorías: Desechables, Pods recargables, Líquidos, Accesorios
  - Sección "Por qué elegirnos" con ilustraciones lineales tipo lata-esquemática (estilo "Natural Electronic & Minerals")
  - Footer con info, redes y botón flotante de WhatsApp

- `/catalogo` — **Catálogo**
  - Filtros laterales: marca, tipo (desechable/pod/líquido), nivel de nicotina, número de puffs, rango de precio
  - Buscador
  - Grid de tarjetas de producto en bloques de colores alternados, cada una con imagen, nombre, sabor, precio y botón "Pedir"
  - Paginación

- `/sabores` — **Catálogo de sabores**
  - Mosaico visual de sabores (Frutas, Mentol, Postres, Tabaco, Bebidas) con bloques de color
  - Al clicar un sabor → filtra productos que lo incluyen

- `/producto/$slug` — **Detalle de producto**
  - Layout en bloque de color (según el sabor): imagen grande del vape al centro, nombre y volumen a la izquierda, "Detalle del producto" a la derecha
  - Tabla de specs (puffs, mAh, nicotina, resistencia, sabor)
  - Ingredientes/Notas de sabor
  - Botón grande "Pedir por WhatsApp" con mensaje prellenado: *"Hola, quiero pedir el {producto} sabor {sabor}"*
  - Carrusel inferior 1/4 con otros sabores de la misma línea
  - Productos relacionados

- `/recomendador` — **Quiz de recomendaciones**
  - 4–5 preguntas: ¿Eres principiante o experimentado? ¿Qué sabor prefieres? ¿Nivel de nicotina? ¿Desechable o recargable? ¿Presupuesto?
  - Resultado: 3 productos recomendados con explicación + CTA WhatsApp
  - Diseñado en bloques de colores, una pregunta por pantalla con transiciones

- `/contacto` — **Contacto**
  - Información de la tienda, horarios, ubicación
  - Botón directo a WhatsApp y redes sociales
  - Formulario simple de consulta (mailto)

## Sistema de diseño

- **Paleta** (basada en referencia): rosa magenta, azul marino, coral/rojo, naranja, crema, blanco
- **Tipografía**: Serif display (tipo Fraunces/DM Serif) para titulares + Sans (Inter) para cuerpo
- **Componentes**: Tarjetas en bloques redondeados, badges circulares con texto curvo "Pedir Pedir Pedir", indicadores de carrusel con números 01—03, ilustraciones lineales blancas sobre color
- Modal de edad bloqueante con dos botones: "Soy mayor de 18" / "Salir"

## Datos

Productos hardcodeados en `src/data/products.ts` (nombre, slug, marca, sabor, puffs, nicotina, precio, color de bloque, descripción, imagen). Fácil de editar después.

## Configuración

Variable `WHATSAPP_NUMBER` en un archivo de config para generar enlaces `https://wa.me/...?text=...`. Se puede cambiar en un solo lugar.

## Detalles técnicos

- TanStack Start con rutas en `src/routes/` (una por página)
- Componentes reutilizables: `ProductCard`, `ColorBlock`, `WhatsAppButton`, `AgeGateModal`, `Carousel`, `Header`, `Footer`
- Imágenes de productos: placeholders generados localmente o de Unsplash hasta que subas las reales
- Estado del quiz con `useState`; resultado calculado por puntuación simple
- Modal de edad con `localStorage` para no repetir

## Aviso legal

Incluir disclaimer en footer: "Producto destinado a mayores de 18 años. La nicotina es adictiva." y página `/aviso-legal` básica.
