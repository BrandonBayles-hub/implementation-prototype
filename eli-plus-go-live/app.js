const properties = [
  {
    name: "Sunset Ridge",
    status: "ready",
    products: ["Leasing", "Payments", "Maint.", "Renewals"],
  },
  {
    name: "Parkside Lofts",
    status: "ready",
    products: ["Leasing", "Payments"],
  },
  {
    name: "Harbor View",
    status: "blocked",
    products: ["Leasing", "Payments"],
    openItems: [
      "Email Integration",
      "Privacy Policies",
      "Carrier Compliance",
      "IVR Setup",
    ],
  },
  {
    name: "Maple Commons",
    status: "live",
    products: ["Leasing", "Payments", "Maint."],
  },
]

const statusLabels = {
  ready: "Ready to go live",
  blocked: "Needs setup (4)",
  live: "Live",
}

const state = {
  query: "",
  filter: "all",
  selected: new Set(),
  expanded: new Set(),
}

const rowsEl = document.querySelector("#propertyRows")
const emptyEl = document.querySelector("#emptyState")
const searchEl = document.querySelector("#search")
const filterEl = document.querySelector("#statusFilter")
const selectAllEl = document.querySelector("#selectAll")
const batchEl = document.querySelector("#batchButton")

function checkboxTooltip(property) {
  if (property.status === "blocked") return "Cannot batch select: requires setup"
  if (property.status === "live") return "Cannot batch select: already live"
  return `Add ${property.name} to a batch launch`
}

function productIcon(property) {
  if (property.status === "live") return "✓"
  if (property.status === "blocked") return "△"
  return "◇"
}

function filteredProperties() {
  const query = state.query.trim().toLowerCase()
  return properties.filter(property => {
    const matchesStatus = state.filter === "all" || property.status === state.filter
    const matchesQuery = !query || property.name.toLowerCase().includes(query)
    return matchesStatus && matchesQuery
  })
}

function renderStatus(property) {
  if (property.status !== "blocked") {
    return `<span class="status ${property.status}">${statusLabels[property.status]}</span>`
  }

  const expanded = state.expanded.has(property.name)
  return `
    <button
      class="status blocked"
      type="button"
      aria-expanded="${expanded}"
      data-toggle-reasons="${property.name}"
      title="${expanded ? "Hide the open items" : "Show what's blocking this property"}"
    >
      ${statusLabels.blocked}
      <span class="chev" aria-hidden="true">⌄</span>
    </button>
  `
}

function renderProducts(property) {
  const icon = productIcon(property)
  return property.products.map(product => `
    <span class="product" title="${product} at ${property.name} — ${property.status}">
      <span aria-hidden="true">${icon}</span>${product}
    </span>
  `).join("")
}

function renderOpenItems(property) {
  if (!property.openItems) return ""
  return `
    <ul class="open-list">
      ${property.openItems.map(item => `
        <li>
          <a href="#" data-setup-link="${item}" title="Opens ${item}">
            ${item}<span class="go" aria-hidden="true">›</span>
          </a>
        </li>
      `).join("")}
    </ul>
  `
}

function renderAction(property) {
  const blocked = property.status === "blocked"
  const live = property.status === "live"
  const label = live ? "Deactivate · All Products" : "Go Live · All Products"
  return `
    <div class="split ${live ? "danger" : ""}">
      <button
        class="primary"
        type="button"
        ${blocked ? "disabled" : ""}
        title="${blocked
          ? `${property.name} can't go live yet`
          : live
            ? `Deactivate every live product at ${property.name}`
            : `Go live with all products at ${property.name}`}"
      >${label}</button>
      <button
        class="caret"
        type="button"
        data-menu="${property.name}"
        aria-label="${live ? "Choose a product to deactivate" : "Choose a product to go live"} at ${property.name}"
      >⌄</button>
    </div>
  `
}

function render() {
  const visible = filteredProperties()
  rowsEl.innerHTML = visible.map(property => {
    const expanded = state.expanded.has(property.name)
    const canSelect = property.status === "ready"
    const selected = state.selected.has(property.name)

    return `
      <div class="row property-row ${expanded ? "expanded" : ""}" data-property="${property.name}">
        <div class="check-cell">
          <span class="checkbox-tip" title="${checkboxTooltip(property)}">
            <input
              type="checkbox"
              data-select="${property.name}"
              aria-label="Select ${property.name}"
              ${selected ? "checked" : ""}
              ${canSelect ? "" : "disabled"}
            >
          </span>
        </div>
        <div class="property-cell">
          ${property.name}
          ${renderOpenItems(property)}
        </div>
        <div class="status-cell">${renderStatus(property)}</div>
        <div class="products-cell products">${renderProducts(property)}</div>
        <div class="action-cell">${renderAction(property)}</div>
      </div>
    `
  }).join("")

  emptyEl.hidden = visible.length > 0
  updateBatch()
  bindRows()
}

function updateBatch() {
  const count = state.selected.size
  batchEl.disabled = count === 0
  batchEl.textContent = count
    ? `↗ Go Live · ${count} Selected ${count === 1 ? "Property" : "Properties"}`
    : "↗ Go Live · Selected Properties"

  const visibleReady = filteredProperties().filter(property => property.status === "ready")
  selectAllEl.checked = visibleReady.length > 0 && visibleReady.every(property => state.selected.has(property.name))
  selectAllEl.indeterminate = !selectAllEl.checked && visibleReady.some(property => state.selected.has(property.name))
}

function bindRows() {
  document.querySelectorAll("[data-select]").forEach(input => {
    input.addEventListener("change", event => {
      const name = event.currentTarget.dataset.select
      if (event.currentTarget.checked) state.selected.add(name)
      else state.selected.delete(name)
      updateBatch()
    })
  })

  document.querySelectorAll("[data-toggle-reasons]").forEach(button => {
    button.addEventListener("click", event => {
      const name = event.currentTarget.dataset.toggleReasons
      if (state.expanded.has(name)) state.expanded.delete(name)
      else state.expanded.add(name)
      render()
    })
  })

  document.querySelectorAll("[data-setup-link]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault()
      alert(`${event.currentTarget.dataset.setupLink} setup flow would open here.`)
    })
  })

  document.querySelectorAll("[data-menu]").forEach(button => {
    button.addEventListener("click", event => {
      document.querySelectorAll(".menu").forEach(menu => menu.remove())
      const name = event.currentTarget.dataset.menu
      const property = properties.find(item => item.name === name)
      const menu = document.createElement("div")
      const rect = event.currentTarget.getBoundingClientRect()
      menu.className = "menu"
      menu.style.left = `${Math.max(8, rect.right - 230)}px`
      menu.style.top = `${rect.bottom + window.scrollY + 5}px`
      menu.innerHTML = property.products.map(product =>
        `<button type="button">${property.status === "live" ? "Deactivate" : "Go Live"} · ${product}</button>`
      ).join("")
      document.body.appendChild(menu)
    })
  })
}

searchEl.addEventListener("input", event => {
  state.query = event.currentTarget.value
  render()
})

filterEl.addEventListener("change", event => {
  state.filter = event.currentTarget.value
  state.selected.clear()
  render()
})

selectAllEl.addEventListener("change", event => {
  filteredProperties()
    .filter(property => property.status === "ready")
    .forEach(property => {
      if (event.currentTarget.checked) state.selected.add(property.name)
      else state.selected.delete(property.name)
    })
  render()
})

batchEl.addEventListener("click", () => {
  alert(`Review launch for ${[...state.selected].join(", ")}`)
})

document.addEventListener("click", event => {
  if (!event.target.closest("[data-menu], .menu")) {
    document.querySelectorAll(".menu").forEach(menu => menu.remove())
  }
})

render()
