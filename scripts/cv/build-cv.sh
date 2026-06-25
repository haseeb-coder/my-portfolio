#!/usr/bin/env bash
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
OUT="$DIR/../../public/Haseeb_ur_Rehman_CV.pdf"

google-chrome --headless --disable-gpu --no-sandbox \
  --no-pdf-header-footer \
  --print-to-pdf="$OUT" \
  "file://$DIR/cv.html"

echo "CV written to $OUT"
