# 料理メモ — 食譜小卡

在日本廚房隨手翻的家庭料理小卡。繁體中文作法，食材附上日本超市的日文名稱（方便照著買）。

## 看食譜

- **手機／任何地方**：https://aacczury.github.io/ryouri-memo/ （可「加入主畫面」變 app，離線可看）
- **本機**：直接用瀏覽器打開 `index.html`（純靜態、不用伺服器）
- 首頁：依分類（肉／魚／野菜／卵・豆腐／基礎／甘味）篩選，點卡片看作法。
- 部署與更新流程見 `DEPLOY.md`。

## 新增 / 修改食譜

全部內容在 `data.js` 的 `RECIPES` 陣列，照現有格式複製一筆就好：

```js
{
  id: "英文-代號",            // 網址用，唯一
  cat: "meat",               // meat | fish | veg | egg | basic | sweet（決定顏色與分類）
  catLabel: "牛肉",          // 卡片上顯示的小標
  name: "菜名",
  jp: "日文名 / 讀音",
  desc: "一句話介紹",
  meta: { serves: "2人份", time: "約20分", heat: "大火快炒" },
  tags: ["下飯", "快炒"],
  ingredients: [ { group: "主料", items: [ { item: "牛肉", jp: "牛こま切れ", note: "切條" } ] } ],
  steps: [ "第一步…", "第二步…" ],
  tips: [ "小撇步…" ],
  variations: [ { title: "變化版", lines: ["…"] } ],  // 沒有就 []
  compare: null,  // 需要比較表時填 { caption, headers:[], rows:[[]] }
}
```

## 檔案

- `index.html` — 外殼
- `style.css` — 樣式
- `data.js` — 食譜內容（**改這個**）
- `app.js` — 渲染與路由
