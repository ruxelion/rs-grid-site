# ruxelion-site — recettes just
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

# Installer les dépendances
install:
    npm install --prefer-offline --no-audit --no-fund
