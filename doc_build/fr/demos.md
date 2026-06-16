# Démos live

Chaque onglet ci-dessous embarque une véritable instance rs-grid compilée
en WebAssembly et montée par le framework correspondant. Elles partagent
toutes le même dataset virtuel (jusqu'à 1 quadrillion de lignes), les
mêmes trois thèmes (Light / Dark / Dimmed) et les mêmes quinze locales —
seule la couche d'intégration change.


**[object Object]**

Une app Leptos 0.8 CSR qui embarque `<GridCanvas>` de `rs-grid-leptos`.
Les signaux pilotent la taille du dataset, le thème, la locale et les
toggles d'édition.

Chargement de la démo Leptos…

rs-grid — démo Leptos[Ouvrir la démo Leptos dans un nouvel onglet ↗](/demos/leptos/index.html)


**[object Object]**

Une app Dioxus CSR utilisant `rs-grid-dioxus`. Mêmes contrôles, même
dataset, idiomes de framework différents.

Chargement de la démo Dioxus…

rs-grid — démo Dioxus[Ouvrir la démo Dioxus dans un nouvel onglet ↗](/demos/dioxus/index.html)


**[object Object]**

Une app Yew CSR utilisant `rs-grid-yew`. Démontre le même pipeline
branché sur le modèle de composant et le message passing de Yew.

Chargement de la démo Yew…

rs-grid — démo Yew[Ouvrir la démo Yew dans un nouvel onglet ↗](/demos/yew/index.html)


## Ce que vous regardez

Les trois démos appellent le même workspace Rust :

- **`rs-grid-core`** — modèle headless, viewport, sélection, hit-testing
- **`rs-grid-scene`** — construit des primitives renderer-agnostiques
- **`rs-grid-render-canvas`** — dessine ces primitives sur un canvas 2D
- **`rs-grid-web`** — events DOM, mise à l'échelle DPR, boucle rAF, parsing du thème CSS
- **`rs-grid-{leptos,dioxus,yew}`** — fin wrapper de composant pour chaque framework

La seule chose qui diffère entre les trois iframes est la couche wrapper —
le gros du travail (virtualisation, rendu, gestion d'entrées) est le même
code Rust.

> Chaque iframe charge son propre module WebAssembly. Le premier passage
> sur un onglet déclenchera un téléchargement (≈5 Mo par framework,
> gzippé sur Pages). Les visites suivantes tapent le cache HTTP.
