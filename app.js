(function () {
  const grid = document.getElementById("grid");
  const filtersEl = document.getElementById("filters");

  const buckets = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.bucket.split(" · ")[1] || p.bucket)))];
  let active = "All";

  function bucketLabel(p) { return p.bucket.split(" · ")[1] || p.bucket; }

  function renderFilters() {
    filtersEl.innerHTML = "";
    buckets.forEach((b) => {
      const chip = document.createElement("button");
      chip.className = "chip" + (b === active ? " active" : "");
      chip.textContent = b;
      chip.onclick = () => { active = b; renderFilters(); renderGrid(); };
      filtersEl.appendChild(chip);
    });
  }

  function card(p) {
    const el = document.createElement("article");
    el.className = "card";
    const demo = p.demo
      ? `<a href="${p.demo}" target="_blank" rel="noopener">Live demo</a>`
      : `<a class="muted" href="${p.repo}" target="_blank" rel="noopener">Demo soon</a>`;
    el.innerHTML = `
      <span class="bucket">${p.bucket}</span>
      <h3>${p.name}</h3>
      <p class="desc">${p.desc}</p>
      <div class="metric">${p.metric}</div>
      <div class="stack">${p.stack.map((s) => `<span class="tag">${s}</span>`).join("")}</div>
      <div class="actions">
        <a href="${p.repo}" target="_blank" rel="noopener">Code</a>
        ${demo}
      </div>`;
    return el;
  }

  function renderGrid() {
    grid.innerHTML = "";
    PROJECTS
      .filter((p) => active === "All" || bucketLabel(p) === active)
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      .forEach((p) => grid.appendChild(card(p)));
  }

  renderFilters();
  renderGrid();
})();
