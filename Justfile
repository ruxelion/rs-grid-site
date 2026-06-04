# rs-grid-site — recettes just
# Usage: just <recipe>

set shell := ["cmd.exe", "/C"]

# Liste des recettes disponibles
default:
    @just --list

# Serveur de développement RSPress (hot-reload)
dev:
    npm install --prefer-offline --no-audit --no-fund
    npx rspress dev --host 0.0.0.0

# Build du site (production)
build:
    npm install --prefer-offline --no-audit --no-fund
    npm run build

# Prévisualisation du build de production
preview: build
    npm run preview

# Rebuild les démos WASM (basic-js + leptos/dioxus/yew via trunk)
# Optionnel : just build-demos RS_GRID=../mon/rs-grid
build-demos rs_grid="../../rs-grid":
    bash scripts/update-wasm-demo.sh {{rs_grid}}

# Installer les dépendances
install:
    npm install --prefer-offline --no-audit --no-fund
