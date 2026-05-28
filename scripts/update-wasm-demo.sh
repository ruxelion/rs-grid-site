#!/usr/bin/env bash
# update-wasm-demo.sh
# Rebuilds the rs-grid WASM artefacts and copies them into the site.
#
# Two kinds of demos:
#
# 1. Home-page live demo — built from `examples/basic-js` (library mode,
#    exports a `JsGrid` class). The React <GridDemo> component on the
#    home page instantiates `new JsGrid(canvas, rows, cols)` directly,
#    so the surrounding HTML chrome stays inside rspress.
#
# 2. /demos page — three full framework apps embedded as <iframe>:
#    basic-leptos, basic-dioxus, basic-yew. Each one is a standalone
#    trunk-built app served from /demos/<framework>/.
#
# Usage (from repo root or scripts/):
#   bash scripts/update-wasm-demo.sh [path/to/rs-grid]
#
# Requires: wasm-pack, trunk, cargo (Rust toolchain with
# wasm32-unknown-unknown target).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
RS_GRID="${1:-../../rs-grid}"          # default: sibling repo
WASM_OUT="$SITE_ROOT/docs/public/wasm"
DEMOS_OUT="$SITE_ROOT/docs/public/demos"

# Git Bash on Windows mangles absolute paths passed as CLI args to
# native (non-MSYS) binaries — trunk's --public-url becomes
# "c:/Program Files/Git/demos/..." instead of "/demos/...".
# This env var disables that conversion.
export MSYS_NO_PATHCONV=1

# ── 1. Home-page library-mode wasm (basic-js)
# ────────────────────────────────────────────
echo "▶ Building basic-js (library mode) …"
(cd "$RS_GRID/examples/basic-js" \
  && wasm-pack build --target web --release --out-dir pkg)

cp "$RS_GRID/examples/basic-js/pkg/basic_js.js"     "$WASM_OUT/basic_js.js"
cp "$RS_GRID/examples/basic-js/pkg/basic_js_bg.wasm" "$WASM_OUT/basic_js_bg.wasm"
echo "  → $(du -sh "$WASM_OUT/basic_js_bg.wasm" | cut -f1) wasm, $(du -sh "$WASM_OUT/basic_js.js" | cut -f1) js"

# ── 2. /demos framework apps (trunk-built standalone)
# ────────────────────────────────────────────────────
build_framework_demo() {
  local fw="$1"          # leptos | dioxus | yew
  local src="$RS_GRID/examples/basic-$fw"
  local out="$DEMOS_OUT/$fw"

  echo "▶ Building basic-$fw → /demos/$fw/ …"
  (cd "$src" && trunk build --release --public-url "/demos/$fw/")

  rm -rf "$out"
  mkdir -p "$out"
  cp -r "$src/dist/." "$out/"
  echo "  → $(du -sh "$out" | cut -f1) total"
}

build_framework_demo leptos
build_framework_demo dioxus
build_framework_demo yew

echo ""
echo "✔ All done."
echo ""
echo "Next: git add docs/public && git commit -m 'chore: rebuild WASM demos'"
