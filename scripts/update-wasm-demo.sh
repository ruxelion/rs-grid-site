#!/usr/bin/env bash
# update-wasm-demo.sh
# Rebuilds the rs-grid WASM demo and copies it into the site.
#
# Builds the `basic-js` example (library mode — exports a `JsGrid` class
# usable from any JS host). The React <GridDemo> component on the home
# page instantiates `new JsGrid(canvas, rows, cols)` directly, so the
# surrounding HTML chrome stays inside rspress instead of being injected
# by a full Leptos/Yew/Dioxus app shell.
#
# Usage (from repo root or scripts/):
#   bash scripts/update-wasm-demo.sh [path/to/rs-grid]
#
# Requires: wasm-pack, cargo (Rust toolchain with wasm32-unknown-unknown target)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
RS_GRID="${1:-../../rs-grid}"          # default: sibling repo
EXAMPLE="$RS_GRID/examples/basic-js"
OUT_DIR="$SITE_ROOT/docs/public/wasm"

echo "▶ Building WASM demo from $EXAMPLE …"
(cd "$EXAMPLE" && wasm-pack build --target web --release --out-dir pkg)

JS_SRC="$EXAMPLE/pkg/basic_js.js"
WASM_SRC="$EXAMPLE/pkg/basic_js_bg.wasm"

if [[ ! -f "$JS_SRC" || ! -f "$WASM_SRC" ]]; then
  echo "✗ Build artefacts not found in $EXAMPLE/pkg" >&2
  exit 1
fi

echo "▶ Copying artefacts to $OUT_DIR …"
cp "$JS_SRC"   "$OUT_DIR/basic_js.js"
cp "$WASM_SRC" "$OUT_DIR/basic_js_bg.wasm"

echo "✔ Done — $(du -sh "$OUT_DIR/basic_js_bg.wasm" | cut -f1) WASM, $(du -sh "$OUT_DIR/basic_js.js" | cut -f1) JS"
echo ""
echo "Next: git add docs/public/wasm && git commit -m 'chore: update WASM demo'"
