#!/usr/bin/env bash
# update-wasm-demo.sh
# Rebuilds the rs-grid WASM artefacts and copies them into the site.
#
# The demos now live in their own repos (the in-tree `examples/*` were
# extracted), each with the buildable crate at its repo root:
#
#   rs-grid-example-js      (basic-js)      library mode → home-page demo
#   rs-grid-example-leptos  (basic-leptos)  standalone trunk app → /demos/leptos/
#   rs-grid-example-dioxus  (basic-dioxus)  standalone trunk app → /demos/dioxus/
#   rs-grid-example-yew     (basic-yew)     standalone trunk app → /demos/yew/
#
# Each example repo pins the rs-grid version it builds against in its own
# Cargo.toml (`git = ".../rs-grid", tag = "vX.Y.Z"`), so the right rs-grid is
# pulled automatically — this script just builds the example repos as-is.
#
# Sources are taken from these env vars (relative paths are resolved against
# the site repo root; defaults assume sibling clones):
#
#   JS_SRC      (default ../rs-grid-example-js)
#   LEPTOS_SRC  (default ../rs-grid-example-leptos)
#   DIOXUS_SRC  (default ../rs-grid-example-dioxus)
#   YEW_SRC     (default ../rs-grid-example-yew)
#
# Usage (from repo root or scripts/):
#   bash scripts/update-wasm-demo.sh
#   JS_SRC=/abs/path LEPTOS_SRC=... bash scripts/update-wasm-demo.sh
#
# Requires: wasm-pack, trunk, cargo (Rust toolchain with
# wasm32-unknown-unknown target), node (leptos demo compiles Tailwind via a
# Trunk pre_build hook).

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WASM_OUT="$SITE_ROOT/docs/public/wasm"
DEMOS_OUT="$SITE_ROOT/docs/public/demos"

# Resolve a source path to an absolute one. Relative paths are taken relative
# to the site repo root, so the script behaves the same from root or scripts/,
# and CI can pass either sibling-relative checkouts or absolute paths.
resolve_src() {
  local p="$1"
  case "$p" in
    /* | [A-Za-z]:[/\\]*) printf '%s\n' "$p" ;;
    *) (cd "$SITE_ROOT/$p" && pwd) ;;
  esac
}

JS_SRC="$(resolve_src "${JS_SRC:-../rs-grid-example-js}")"
LEPTOS_SRC="$(resolve_src "${LEPTOS_SRC:-../rs-grid-example-leptos}")"
DIOXUS_SRC="$(resolve_src "${DIOXUS_SRC:-../rs-grid-example-dioxus}")"
YEW_SRC="$(resolve_src "${YEW_SRC:-../rs-grid-example-yew}")"

# Git Bash on Windows mangles absolute paths passed as CLI args to
# native (non-MSYS) binaries — trunk's --public-url becomes
# "c:/Program Files/Git/demos/..." instead of "/demos/...".
# This env var disables that conversion.
export MSYS_NO_PATHCONV=1

# ── 1. Home-page library-mode wasm (basic-js)
# ────────────────────────────────────────────
echo "▶ Building basic-js (library mode) from $JS_SRC …"
(cd "$JS_SRC" \
  && wasm-pack build --target web --release --out-dir pkg)

cp "$JS_SRC/pkg/basic_js.js"     "$WASM_OUT/basic_js.js"
cp "$JS_SRC/pkg/basic_js_bg.wasm" "$WASM_OUT/basic_js_bg.wasm"
echo "  → $(du -sh "$WASM_OUT/basic_js_bg.wasm" | cut -f1) wasm, $(du -sh "$WASM_OUT/basic_js.js" | cut -f1) js"

# ── 2. /demos framework apps (trunk-built standalone)
# ────────────────────────────────────────────────────
build_framework_demo() {
  local fw="$1"          # leptos | dioxus | yew
  local src="$2"         # repo root for that framework's example
  local out="$DEMOS_OUT/$fw"

  echo "▶ Building basic-$fw → /demos/$fw/ from $src …"
  (cd "$src" && trunk build --release --public-url "/demos/$fw/")

  rm -rf "$out"
  mkdir -p "$out"
  cp -r "$src/dist/." "$out/"
  echo "  → $(du -sh "$out" | cut -f1) total"
}

build_framework_demo leptos "$LEPTOS_SRC"
build_framework_demo dioxus "$DIOXUS_SRC"
build_framework_demo yew    "$YEW_SRC"

echo ""
echo "✔ All done."
echo ""
echo "Next: git add docs/public && git commit -m 'chore: rebuild WASM demos'"
