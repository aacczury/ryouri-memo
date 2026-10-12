#!/bin/sh
# Regenerate version.js: content hash of the core files + commit time (JST).
# Run before every commit that changes the app or data (hash excludes version.js itself).
cd "$(dirname "$0")" || exit 1
hash=$(cat index.html style.css app.js data.js sw.js manifest.webmanifest | shasum -a 256 | cut -c1-7)
time=$(TZ=Asia/Tokyo date "+%Y-%m-%d %H:%M JST")
printf 'const APP_VERSION = { hash: "%s", time: "%s" };\n' "$hash" "$time" > version.js
echo "version.js → $hash · $time"
