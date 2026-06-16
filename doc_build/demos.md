# Live demos

Each tab below embeds a real rs-grid instance compiled to WebAssembly and
mounted by the corresponding framework. They share the same virtual dataset
(up to 1 quadrillion rows), the same three themes (Light / Dark / Dimmed),
and the same fifteen locales — only the integration layer changes.


**[object Object]**

A Leptos 0.8 CSR app wrapping `<GridCanvas>` from `rs-grid-leptos`. Reactive
signals drive the dataset size, theme, locale and editability toggles.

Loading Leptos demo…

rs-grid — Leptos demo[Open Leptos demo in new tab ↗](/demos/leptos/index.html)


**[object Object]**

A Dioxus CSR app using `rs-grid-dioxus`. Same controls, same dataset,
different framework idioms.

Loading Dioxus demo…

rs-grid — Dioxus demo[Open Dioxus demo in new tab ↗](/demos/dioxus/index.html)


**[object Object]**

A Yew CSR app using `rs-grid-yew`. Demonstrates the same pipeline plugged
into Yew's component model and message passing.

Loading Yew demo…

rs-grid — Yew demo[Open Yew demo in new tab ↗](/demos/yew/index.html)


## What you're looking at

All three demos call into the same Rust workspace:

- **`rs-grid-core`** — headless model, viewport, selection, hit-testing
- **`rs-grid-scene`** — builds renderer-agnostic primitives
- **`rs-grid-render-canvas`** — draws those primitives on a 2D canvas
- **`rs-grid-web`** — DOM events, DPR scaling, rAF loop, CSS theme parsing
- **`rs-grid-{leptos,dioxus,yew}`** — thin component wrapper for each framework

The only thing that differs between the three iframes is the wrapper layer
— the heavy lifting (virtualization, rendering, input handling) is the
same Rust code.

> Each iframe boots its own WebAssembly module. Switching tabs the first
> time will trigger a download (≈5 MB per framework, gzipped on Pages).
> Subsequent visits hit the HTTP cache.
