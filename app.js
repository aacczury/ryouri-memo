// 料理メモ — render + hash routing. No build, no server: works from file://
"use strict";

const CATS = {
  meat:  { label: "肉",       filter: "肉"        },
  fish:  { label: "魚",       filter: "魚"        },
  veg:   { label: "野菜",      filter: "野菜"      },
  egg:   { label: "卵・豆腐",  filter: "卵・豆腐"  },
  basic: { label: "基礎",      filter: "だし・基礎" },
};
const FILTER_ORDER = ["all", "meat", "fish", "veg", "egg", "basic"];

let filter = "all";
const app = document.getElementById("app");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function render() {
  const id = location.hash.replace(/^#\/?/, "");
  const recipe = RECIPES.find((r) => r.id === id);
  if (recipe) renderDetail(recipe);
  else renderHome();
  window.scrollTo(0, 0);
}

function renderHome() {
  const list = filter === "all" ? RECIPES : RECIPES.filter((r) => r.cat === filter);
  const filters = FILTER_ORDER.map((f) => {
    const label = f === "all" ? "全部" : CATS[f].filter;
    return `<button class="filter" data-f="${f}" aria-pressed="${filter === f}">${label}</button>`;
  }).join("");

  const cards = list.map((r) => `
    <a class="card cat-${r.cat}" href="#/${r.id}">
      <div class="card-top">
        <span class="tag">${esc(r.catLabel)}</span>
        <span class="card-meta">${esc(r.meta.serves)} · ${esc(r.meta.time)}</span>
      </div>
      <div class="card-name">${esc(r.name)}</div>
      <div class="card-jp">${esc(r.jp)}</div>
      <p class="card-desc">${esc(r.desc)}</p>
      <div class="chips">${r.tags.map((t) => `<span class="pill">${esc(t)}</span>`).join("")}</div>
    </a>`).join("");

  app.innerHTML = `
    <header class="head">
      <p class="kicker">Recipe Notes · 在日本廚房</p>
      <h1>料理メモ</h1>
      <p class="sub">在日本超市買得到的家庭料理 — 繁中作法，食材附日文標籤方便照買。</p>
    </header>
    <nav class="filters">${filters}</nav>
    <main class="grid">${cards || '<p class="sub">這個分類還沒有食譜。</p>'}</main>
    <footer class="foot">${RECIPES.length} 道食譜 · 點卡片看作法</footer>`;

  app.querySelectorAll(".filter").forEach((b) =>
    b.addEventListener("click", () => { filter = b.dataset.f; renderHome(); }));
}

function renderDetail(r) {
  const ingredients = r.ingredients.map((g) => `
    <div class="ing-group">${esc(g.group)}</div>
    ${g.items.map((i) => `
      <div class="ing">
        <span class="ing-item">${esc(i.item)}</span>
        ${i.jp ? `<span class="jp-chip">${esc(i.jp)}</span>` : ""}
        ${i.note ? `<span class="ing-note">${esc(i.note)}</span>` : ""}
      </div>`).join("")}`).join("");

  const steps = r.steps.length ? `
    <section class="section">
      <h3>步驟</h3>
      <ol class="steps">${r.steps.map((s) => `
        <li><span class="num">${"" }</span><span class="txt">${esc(s)}</span></li>`).join("")}</ol>
    </section>` : "";

  const compare = r.compare ? `
    <section class="section">
      <h3>替代比較</h3>
      <p class="tbl-cap">${esc(r.compare.caption)}</p>
      <table class="cmp">
        <thead><tr>${r.compare.headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>
        <tbody>${r.compare.rows.map((row) =>
          `<tr>${row.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </section>` : "";

  const variations = (r.variations && r.variations.length) ? `
    <section class="section">
      <h3>變化・替代</h3>
      ${r.variations.map((v) => `
        <div class="box">
          <h4>${esc(v.title)}</h4>
          <ul>${v.lines.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
        </div>`).join("")}
    </section>` : "";

  const tips = (r.tips && r.tips.length) ? `
    <section class="section tips">
      <h3>小撇步</h3>
      <ul>${r.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
    </section>` : "";

  app.innerHTML = `
    <article class="detail cat-${r.cat}">
      <a class="back" href="#/">← 料理メモ</a>
      <header class="detail-head">
        <span class="tag">${esc(r.catLabel)}</span>
        <h1>${esc(r.name)}</h1>
        <p class="jp">${esc(r.jp)}</p>
        <p class="desc">${esc(r.desc)}</p>
        <div class="metarow">
          <span>份量 ${esc(r.meta.serves)}</span>
          <span>時間 ${esc(r.meta.time)}</span>
          ${r.meta.heat ? `<span>火候 ${esc(r.meta.heat)}</span>` : ""}
        </div>
      </header>
      <section class="section"><h3>食材</h3>${ingredients}</section>
      ${steps}
      ${compare}
      ${variations}
      ${tips}
      <footer class="foot"><a class="back" href="#/">← 回到所有食譜</a></footer>
    </article>`;

  // fill step numbers (kept out of the template so they always match order)
  app.querySelectorAll(".steps .num").forEach((el, i) => { el.textContent = i + 1; });
}

window.addEventListener("hashchange", render);
render();
