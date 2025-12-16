#!/bin/bash
set -e

echo "Minifying CSS..."
cp css/css-style.css css/css-style.css.bak
npx -y clean-css-cli -o css/css-style.css css/css-style.css.bak

cp css/css-custom.css css/css-custom.css.bak
npx -y clean-css-cli -o css/css-custom.css css/css-custom.css.bak

echo "Minifying JS..."
cp js/js-main.js js/js-main.js.bak
npx -y terser js/js-main.js.bak -o js/js-main.js --compress --mangle

echo "Minifying HTML..."
# Minify index.html as a priority example
npx -y html-minifier-terser index.html -o index.html --collapse-whitespace --remove-comments --minify-css true --minify-js true

echo "Done."
