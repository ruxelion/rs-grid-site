#!/usr/bin/env python3
"""
PostToolUse hook — after an edit to a TS/TSX/MDX file, runs `npm run
typecheck` (tsc --noEmit, report-only — needs the full program, no
single-file mode) and `biome check --write` (auto-fixes formatting/safe lint
issues, like `cargo fmt` on the Rust side). Exits 2 if real lint errors
remain after the auto-fix, so Claude sees them — mirrors rs-grid's
fmt-check.py (auto-fix format, block on real problems).
"""
import json
import os
import subprocess
import sys

data = json.load(sys.stdin)
file_path = (data.get("tool_input") or {}).get("file_path", "")

if not file_path.endswith((".ts", ".tsx", ".mdx")):
    sys.exit(0)

# Walk up from the edited file to the repo root (nearest package.json).
search_dir = os.path.dirname(os.path.abspath(os.path.normpath(file_path)))
root = None
while True:
    if os.path.exists(os.path.join(search_dir, "package.json")):
        root = search_dir
        break
    parent = os.path.dirname(search_dir)
    if parent == search_dir:  # reached filesystem root
        break
    search_dir = parent

if root is None:
    sys.exit(0)

typecheck = subprocess.run(
    ["npm", "run", "typecheck"],
    cwd=root,
    capture_output=True,
    text=True,
    shell=True,
)
sys.stdout.write(typecheck.stdout)
sys.stderr.write(typecheck.stderr)

if file_path.endswith((".ts", ".tsx")):
    biome = subprocess.run(
        ["npx", "biome", "check", "--write", file_path],
        cwd=root,
        capture_output=True,
        text=True,
        shell=True,
    )
    sys.stdout.write(biome.stdout)
    sys.stderr.write(biome.stderr)
    if biome.returncode != 0:
        sys.exit(2)
