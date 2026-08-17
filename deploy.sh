#!/bin/bash

echo "Building project..."
npm run build

echo "Removing old gh-pages branch..."
git push origin --delete gh-pages 2>/dev/null || true

echo "Deploying fresh build..."
npx gh-pages -d dist

echo "Deployment complete! Wait 2 minutes for GitHub Pages to update.";
