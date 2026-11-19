# Raju Bandam — Design direction

An editorial AI and full-stack engineering portfolio with an interactive ASCII portrait of the owner. The surrounding interface uses white, black, and neutral grays; the original colorful project concept illustrations remain.

- Warm white `#fafaf8`, black `#171717`, neutral gray `#62625d`, and light paper `#f0f0ec`.
- Locally hosted Manrope Variable for clear, tightly tracked headings; DM Mono for navigation details and technical notes.
- Open, asymmetric hero with ASCII/photo modes; two-column visual project index; a tilting personal identity card and selectable disciplines; layered academic records; an interactive technology orbit; magnetic email contact.
- Four original SVG project concept illustrations. They illustrate project capabilities and are explicitly labeled as concept illustrations in the detail view.
- The ASCII portrait uses the actual GitHub profile photograph saved locally at `/portrait.jpg`. Glyphs respond to the pointer and the portrait tilts in perspective. Arrow keys, pause/play, and a photo mode are available. When canvas is unavailable, the original photograph remains visible. Reduced motion starts paused.
- Education is a selectable three-record timeline with layered paper depth, factual qualifications, dates, institutions, and results. The toolkit has keyboard category tabs, technology explanations, an orbit, and a pause control.
- Project details and résumé use native dialogs, including keyboard dismissal and focus restoration. Mobile navigation keeps focus inside its controls and supports short screens.
- Preserve the 14 projects, education, social links, and original résumé. Do not invent employment, performance claims, years of experience, or testimonials.

## 21st.dev components

- [Tilt by ibelick](https://21st.dev/@ibelick/components/tilt): adapted spring-based pointer tilt, with touch and reduced-motion guards.
- The current portrait, education, toolkit and magnetic behavior are original implementations informed by metadata from [EZPZ Dither Portrait](https://21st.dev/@ezam0000/components/ezpz-dither-portrait), [Animated Mosaic Portrait](https://21st.dev/@serafimcloud/components/animated-mosaic-portrait), [Stacked Activity Cards](https://21st.dev/@spydiecy/components/stacked-activity-cards), [Orbiting Skills](https://21st.dev/@olovajs/components/orbiting-skills), and [Magnetic Button](https://21st.dev/@bundui/components/magnetic-button). Catalog metadata informed these original implementations; retrieved Tilt code is attributed separately.

The full context and constraints are recorded in `design.json`.
