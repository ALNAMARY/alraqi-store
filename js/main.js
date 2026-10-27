// Alraqi Store - Main JavaScript

// ========== Language System ==========
let currentLang = localStorage.getItem('alraqi_lang') || 'ar';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('alraqi_lang', lang);
  
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  
  document.querySelectorAll('[data-ar][data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
  
  const langLabel = document.getElementById('lang-label');
  if (langLabel) {
    langLabel.textContent = lang === 'ar' ? 'EN' : 'عربي';
  }
  
  if (typeof renderFeaturedProducts === 'function') renderFeaturedProducts();
  if (typeof renderAllProducts === 'function') renderAllProducts();
  if (typeof renderCart === 'function') renderCart();
  if (typeof renderProductDetail === 'function') renderProductDetail();
}

// ========== Cart System ==========
function getCart() {
  return JSON.parse(localStorage.getItem('alraqi_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('alraqi_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const el = document.getElementById('cart-count');
  if (el) el.textContent = count;
}

function addToCart(productId, qty = 1) {
  const cart = getCart();
  const existing = cart.find(item => item.id === productId);
  
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty });
  }
  
  saveCart(cart);
  showToast(currentLang === 'ar' ? 'تمت الإضافة إلى السلة ✓' : 'Added to cart ✓');
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
  if (typeof renderCart === 'function') renderCart();
}

function updateQty(productId, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    saveCart(cart);
    if (typeof renderCart === 'function') renderCart();
  }
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return sum + (product ? product.price * item.qty : 0);
  }, 0);
}

// ========== Toast ==========
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// ========== Format Price ==========
function formatPrice(price) {
  if (currentLang === 'ar') {
    return price.toLocaleString('ar-EG') + ' ج.م';
  }
  return 'EGP ' + price.toLocaleString('en-US');
}

// ========== Product Card HTML ==========
function productCardHTML(product) {
  const name = product.name[currentLang];
  const badge = product.badge ? product.badge[currentLang] : null;
  
  return `
    <div class="product-card group">
      <a href="product.html?id=${product.id}" class="block">
        <div class="product-image">
          <span class="placeholder">${product.emoji}</span>
          ${badge ? `<span class="product-badge">${badge}</span>` : ''}
        </div>
        <div class="p-4 space-y-2">
          <h3 class="font-medium text-white group-hover:text-primary-400 transition-colors line-clamp-1">${name}</h3>
          <div class="flex items-center gap-1 text-yellow-400 text-sm">
            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
            <span class="text-white/40 text-xs ms-1">(${product.reviews})</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-lg font-bold text-primary-400">${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="text-sm text-white/40 line-through">${formatPrice(product.oldPrice)}</span>` : ''}
          </div>
        </div>
      </a>
      <div class="px-4 pb-4">
        <button onclick="addToCart(${product.id})" class="w-full py-2.5 rounded-xl bg-white/5 hover:bg-primary-500 hover:text-dark-950 border border-white/10 hover:border-primary-500 transition-all text-sm font-medium">
          ${currentLang === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}
        </button>
      </div>
    </div>
  `;
}

// ========== Render Featured Products ==========
function renderFeaturedProducts() {
  const container = document.getElementById('featured-products');
  if (!container) return;
  
  const featured = PRODUCTS.slice(0, 4);
  container.innerHTML = featured.map(p => productCardHTML(p)).join('');
}

// ========== Render All Products ==========
function renderAllProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const cat = urlParams.get('cat');
  
  let filtered = PRODUCTS;
  if (cat) {
    filtered = PRODUCTS.filter(p => p.category === cat);
  }
  
  if (filtered.length === 0) {
    container.innerHTML = `<p class="col-span-full text-center text-white/50 py-12">${currentLang === 'ar' ? 'لا توجد منتجات في هذه الفئة' : 'No products in this category'}</p>`;
    return;
  }
  
  container.innerHTML = filtered.map(p => productCardHTML(p)).join('');
}

// ========== Render Product Detail ==========
function renderProductDetail() {
  const container = document.getElementById('product-detail');
  if (!container) return;
  
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'));
  const product = PRODUCTS.find(p => p.id === id);
  
  if (!product) {
    container.innerHTML = `<p class="text-center text-white/50 py-20">${currentLang === 'ar' ? 'المنتج غير موجود' : 'Product not found'}</p>`;
    return;
  }
  
  const name = product.name[currentLang];
  const desc = product.description[currentLang];
  const badge = product.badge ? product.badge[currentLang] : null;
  
  container.innerHTML = `
    <div class="grid lg:grid-cols-2 gap-10">
      <div class="aspect-square rounded-2xl bg-dark-800 border border-white/5 flex items-center justify-center relative">
        <span class="text-8xl opacity-40">${product.emoji}</span>
        ${badge ? `<span class="absolute top-4 right-4 px-3 py-1 bg-primary-500 text-dark-950 text-sm font-semibold rounded-full">${badge}</span>` : ''}
      </div>
      
      <div class="space-y-6">
        <div>
          <h1 class="text-3xl font-bold mb-2">${name}</h1>
          <div class="flex items-center gap-2 text-yellow-400">
            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
            <span class="text-white/50 text-sm">(${product.reviews} ${currentLang === 'ar' ? 'تقييم' : 'reviews'})</span>
          </div>
        </div>
        
        <div class="flex items-center gap-3">
          <span class="text-3xl font-bold text-primary-400">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="text-xl text-white/40 line-through">${formatPrice(product.oldPrice)}</span>` : ''}
        </div>
        
        <p class="text-white/60 leading-relaxed">${desc}</p>
        
        <div class="flex items-center gap-2 text-sm">
          <span class="w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-400' : 'bg-yellow-400'}"></span>
          <span class="text-white/50">${product.stock > 10 
            ? (currentLang === 'ar' ? 'متوفر في المخزون' : 'In Stock') 
            : (currentLang === 'ar' ? `متبقي ${product.stock} فقط` : `Only ${product.stock} left`)}</span>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3 pt-2">
          <button onclick="addToCart(${product.id})" class="btn-primary flex-1 justify-center">
            ${currentLang === 'ar' ? 'أضف إلى السلة' : 'Add to Cart'}
          </button>
          <a href="products.html" class="btn-secondary flex-1 justify-center">
            ${currentLang === 'ar' ? 'العودة للمنتجات' : 'Back to Products'}
          </a>
        </div>
      </div>
    </div>
  `;
}

// ========== Render Cart ==========
function renderCart() {
  const container = document.getElementById('cart-items');
  const summary = document.getElementById('cart-summary');
  if (!container) return;
  
  const cart = getCart();
  
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 space-y-4">
        <div class="text-5xl opacity-30">🛒</div>
        <p class="text-white/50">${currentLang === 'ar' ? 'سلتك فارغة' : 'Your cart is empty'}</p>
        <a href="products.html" class="btn-primary inline-flex">
          ${currentLang === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
        </a>
      </div>
    `;
    if (summary) summary.classList.add('hidden');
    return;
  }
  
  if (summary) summary.classList.remove('hidden');
  
  container.innerHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return '';
    
    return `
      <div class="cart-item">
        <div class="w-20 h-20 rounded-xl bg-dark-800 flex items-center justify-center text-3xl shrink-0">
          ${product.emoji}
        </div>
        <div class="flex-1 min-w-0">
          <h3 class="font-medium truncate">${product.name[currentLang]}</h3>
          <p class="text-primary-400 font-semibold mt-1">${formatPrice(product.price)}</p>
          <div class="flex items-center justify-between mt-3">
            <div class="qty-control">
              <button onclick="updateQty(${product.id}, -1)">−</button>
              <span class="w-8 text-center text-sm">${item.qty}</span>
              <button onclick="updateQty(${product.id}, 1)">+</button>
            </div>
            <button onclick="removeFromCart(${product.id})" class="text-red-400/70 hover:text-red-400 text-sm">
              ${currentLang === 'ar' ? 'حذف' : 'Remove'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  const totalEl = document.getElementById('cart-total');
  if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
  
  const itemsCount = document.getElementById('cart-items-count');
  if (itemsCount) {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    itemsCount.textContent = currentLang === 'ar' 
      ? `${count} منتج` 
      : `${count} item${count > 1 ? 's' : ''}`;
  }
}

// ========== Init ==========
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      setLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
  }
  
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
  
  updateCartCount();
  
  renderFeaturedProducts();
  renderAllProducts();
  renderProductDetail();
  renderCart();
});
