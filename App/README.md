# Portfolio - Awesome Atmosphere

Portfolio personal construido con Astro + React. El foco esta en una experiencia visual intensa: hero animado, efectos de luz y una terminal interactiva.

## Caracteristicas

- Hero con animaciones y scroll usando GSAP/ScrollTrigger.
- Efectos visuales custom (LightRays, BlobCursor, ScrollFloat, etc.).
- Componentes Astro con islas React para interaccion puntual.
- Estilos base en Tailwind v4 + shadcn.

## Stack

- Astro 6
- React 19
- Tailwind CSS 4
- GSAP, Framer Motion, Three.js

## Requisitos

- Node >= 22.12.0
- pnpm

## Scripts

```sh
pnpm install
pnpm dev
pnpm build
pnpm preview
```

## Estructura del proyecto

```text
src/
	assets/
		style.css
	components/
		externalComponents/
		Header/
		Hero/
		Redes/
	layouts/
		Layout.astro
	pages/
		index.astro
```

## Licencia

MIT. Ver el archivo [LICENSE](LICENSE).
