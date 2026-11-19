# Raju Bandam — Portfolio

A complete redesign of [portfolio_v2](https://github.com/rajureddi/portfolio_v2): a monochrome editorial portfolio for AI engineering, full-stack development, computer vision, and mobile applications.

## Run locally

```sh
npm install
npm run dev
```

The development preview runs at `http://localhost:5173`.

```sh
npm run build
npm run preview
```

Deploy the generated `dist` directory. The included Vercel configuration supports direct `/projects` and `/resume` visits, including trailing slashes. This setup assumes deployment at the domain root.

## Experience

- Custom ASCII portrait rendered from the owner's actual GitHub profile photograph, with pointer-responsive glyphs, perspective depth, keyboard controls, ASCII/photo modes, and pause/play.
- Original photograph fallback when canvas is unavailable, reduced-motion support, and rendering paused when hidden or offscreen.
- Four original, responsive SVG project illustrations with subtle spring tilt.
- All 14 original projects, category filtering, source links, and project detail dialogs.
- Tilting personal identity card, selectable disciplines, layered education records, and an interactive technology explorer with orbit and pause controls.
- Original PDF résumé, email copying, magnetic contact links, and social links.
- Locally hosted fonts, keyboard focus handling, responsive navigation, and accessible native dialogs.

Project artwork illustrates the project's concept; it is not presented as a production screenshot.

## Edit content

- `src/data/portfolio.ts` — profile, projects, education, and skills.
- `src/App.tsx` — page layout and interactions.
- `src/index.css` — shared design tokens and responsive styles.
- `src/components/AsciiPortrait.tsx` — interactive ASCII portrait.
- `src/components/EducationJourney.tsx` — selectable layered education records.
- `src/components/StackExplorer.tsx` — interactive technology categories and orbit.
- `src/components/ProjectArtwork.tsx` — original project illustrations.
- `public/RAJU_BANDAM_RESUME__.pdf` — original résumé.

## Checks

```sh
npm run lint
npx playwright install chromium
npm run test:e2e
```

The browser tests cover portrait modes and fallback, education and toolkit interactions, project filters, modal focus restoration, résumé downloads, deep links, viewport sizes, short-screen mobile navigation, reduced motion, and automated accessibility checks. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` to use an existing Chromium installation. `PLAYWRIGHT_BASE_URL` can point at a production preview.

## 21st.dev

The redesign adapts [Tilt by ibelick](https://21st.dev/@ibelick/components/tilt). The portrait, stacked education records, orbiting toolkit, and magnetic links are original implementations informed by 21st.dev catalog references. Catalog metadata informed the new original implementations. Project artwork and the visual system are custom. Design decisions, reference links, and constraints live in `.21st/`.

No API key is needed to run this site.
