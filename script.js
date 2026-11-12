const products = [
  {
    "id": 1,
    "name": "LOVE Rings",
    "category": "toys",
    "price": 1500,
    "image": "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=700&q=80",
    "tag": "Popular"
  },
  {
    "id": 8,
    "name": "Skincare Collection",
    "category": "cosmetics",
    "price": 1799,
    "image": "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80",
    "tag": "Glow time"
  }
];

// Product catalogue is managed through the local BrightPlay Admin Dashboard.
const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
let activeFilter = "all";
const cart = [];
function renderProducts() {
  let list = products.filter(p => (activeFilter === "all" || p.category === activeFilter) && p.name.toLowerCase().includes(searchInput.value.trim().toLowerCase()));
  if (sortSelect.value === "low") list.sort((a,b) => a.price-b.price);
  if (sortSelect.value === "high") list.sort((a,b) => b.price-a.price);
  grid.innerHTML = "";
  if (!list.length) { grid.innerHTML = '<p class="empty-state">No products found. Try another search.</p>'; return; }
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `<div class="product-image"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span></div><div class="product-info"><span class="product-category">${p.category === "toys" ? "Baby toys" : "Cosmetics"}</span><h3>${p.name}</h3><div class="product-bottom"><span class="price">Rs. ${p.price.toLocaleString("en-PK")}</span><button class="add-btn" type="button" data-id="${p.id}">Add to order +</button></div></div>`;
    grid.appendChild(card);
  });
}
document.querySelectorAll(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active"); activeFilter = btn.dataset.filter; renderProducts();
}));
document.querySelectorAll("[data-category-link]").forEach(link => link.addEventListener("click", () => {
  activeFilter = link.dataset.categoryLink;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.toggle("active", b.dataset.filter === activeFilter));
  renderProducts();
}));
searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);
grid.addEventListener("click", event => {
  const button = event.target.closest("[data-id]");
  if (!button) return;
  const product = products.find(p => p.id === Number(button.dataset.id));
  cart.push(product);
  const lines = cart.map((item, i) => `${i+1}. ${item.name} — Rs. ${item.price.toLocaleString("en-PK")}`);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const message = `Hello BrightPlay! I would like to order:\n${lines.join("\n")}\n\nEstimated total: Rs. ${total.toLocaleString("en-PK")}\nPlease confirm availability and delivery details.`;
  const url = "https://wa.me/923360180085?text=" + encodeURIComponent(message);
  window.open(url, "_blank", "noopener");
});
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false"); }));
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
