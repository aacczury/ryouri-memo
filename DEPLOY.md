# 料理メモ — deploy to GitHub Pages

This folder is a self-contained static web app **and its own git repo** (separate from the
life repo, same pattern as `jp/web`). Hosted at:

**https://aacczury.github.io/ryouri-memo/** → 手機開這個網址 → 分享 → **加入主畫面**。
（第一次載入需要網路，之後離線也能看。）

## Update after adding recipes

```
cd ~/Documents/life/recipes
# edit data.js (照 README.md 的格式加一筆)
git add -A && git commit -m "add <recipe>" && git push
```

The service worker is network-first, so phones pick up changes on next open
(no cache-version bumping needed).

## First-time hosting (already done, for reference)

```
cd ~/Documents/life/recipes
git init -b main && git add -A && git commit -m "init"
gh repo create ryouri-memo --public --source=. --push
gh api -X POST repos/$(gh api user -q .login)/ryouri-memo/pages --input - <<<'{"source":{"branch":"main","path":"/"}}'
```
