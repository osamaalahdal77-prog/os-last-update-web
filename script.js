// ===================== الترجمة (عربي / English) =====================
const text = {
  ar: {
    brand: "بُنّ", currency: "ر.س",
    nav_home: "الرئيسية", nav_menu: "المنيو", nav_cart: "السلة", nav_checkout: "الدفع",
    hero_sub: "قهوة مختصة محمصة طازجة كل يوم", hero_btn: "اطلب الحين",
    featured: "الأكثر طلباً", about_title: "عن بُنّ",
    about_text: "نحمّص حبوبنا بأنفسنا ونقدمها لك بأفضل طعم. اختر قهوتك من المنيو وأضفها للسلة وادفع بخطوات بسيطة.",
    menu_title: "المنيو", f_all: "الكل", f_hot: "ساخن", f_cold: "بارد", f_sweets: "حلويات",
    add: "أضف", added: "تمت الإضافة للسلة ✓",
    cart_title: "سلتك", total: "المجموع", checkout_btn: "إتمام الطلب",
    cart_empty: "السلة فاضية.", see_menu: "شوف المنيو",
    checkout_title: "الدفع", summary: "ملخص الطلب",
    ph_name: "الاسم", ph_phone: "رقم الجوال", ph_address: "العنوان",
    pay_cod: "الدفع عند الاستلام", pay_card: "بطاقة بنكية", confirm: "تأكيد الطلب",
    success_title: "تم استلام طلبك!", success_text: "بنجهز قهوتك ونوصلها لك قريب.", back_home: "الرجوع للرئيسية",
    footer_text: "قهوة مختصة محمصة بحب · جميع الحقوق محفوظة",
    prepared: "إعداد الطالب:", uni_id: "الرقم الجامعي:"
  },
  en: {
    brand: "Bunn", currency: "SAR",
    nav_home: "Home", nav_menu: "Menu", nav_cart: "Cart", nav_checkout: "Checkout",
    hero_sub: "Specialty coffee, roasted fresh every day", hero_btn: "Order now",
    featured: "Most popular", about_title: "About Bunn",
    about_text: "We roast our own beans and serve them at their best. Pick your coffee from the menu, add it to the cart, and pay in a few simple steps.",
    menu_title: "Menu", f_all: "All", f_hot: "Hot", f_cold: "Cold", f_sweets: "Sweets",
    add: "Add", added: "Added to cart ✓",
    cart_title: "Your cart", total: "Total", checkout_btn: "Checkout",
    cart_empty: "Your cart is empty.", see_menu: "See the menu",
    checkout_title: "Checkout", summary: "Order summary",
    ph_name: "Name", ph_phone: "Phone number", ph_address: "Address",
    pay_cod: "Cash on delivery", pay_card: "Bank card", confirm: "Confirm order",
    success_title: "Order received!", success_text: "We're preparing your coffee and will deliver it soon.", back_home: "Back to home",
    footer_text: "Specialty coffee roasted with love · All rights reserved",
    prepared: "Prepared by:", uni_id: "University ID:"
  }
};

let lang = localStorage.getItem("lang") || "ar";
let currentFilter = "all";

// اختصار: t("add") يرجع الكلمة باللغة الحالية
function t(key) {
  return text[lang][key];
}

// ===================== المنتجات =====================
const products = [
  { id: 1, ar: "إسبريسو",        en: "Espresso",        price: 10, type: "hot",    img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600" },
  { id: 2, ar: "لاتيه",          en: "Latte",           price: 16, type: "hot",    img: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=600" },
  { id: 3, ar: "قهوة سعودية",    en: "Saudi Coffee",    price: 14, type: "hot",    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600" },
  { id: 4, ar: "كولد برو",       en: "Cold Brew",       price: 18, type: "cold",   img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600" },
  { id: 5, ar: "آيس لاتيه",      en: "Iced Latte",      price: 17, type: "cold",   img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600" },
  { id: 6, ar: "كرواسان",        en: "Croissant",       price: 9,  type: "sweets", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600" },
  { id: 7, ar: "كيك الشوكولاتة", en: "Chocolate Cake",  price: 20, type: "sweets", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600" },
  { id: 8, ar: "تمر بالقهوة",    en: "Dates & Coffee",  price: 12, type: "sweets", img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600" }
];

function findProduct(id) {
  return products.find(function (p) { return p.id === id; });
}

// ===================== السلة (نحفظها في المتصفح) =====================
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCount();
}

function addToCart(id) {
  const cart = getCart();
  const item = cart.find(function (i) { return i.id === id; });
  if (item) {
    item.qty++;
  } else {
    cart.push({ id: id, qty: 1 });
  }
  saveCart(cart);
  showToast(t("added"));
}

function changeQty(id, amount) {
  let cart = getCart();
  const item = cart.find(function (i) { return i.id === id; });
  item.qty += amount;
  if (item.qty <= 0) {
    cart = cart.filter(function (i) { return i.id !== id; });
  }
  saveCart(cart);
  renderCart();
}

function getTotal() {
  let total = 0;
  getCart().forEach(function (item) {
    total += findProduct(item.id).price * item.qty;
  });
  return total;
}

function updateCount() {
  let count = 0;
  getCart().forEach(function (i) { count += i.qty; });
  document.getElementById("cart-count").textContent = count;
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(function () { toast.classList.remove("show"); }, 1500);
}

// ===================== عرض المنتجات =====================
function productCard(p) {
  return `
    <div class="bg-white rounded-2xl overflow-hidden shadow hover:-translate-y-1 hover:shadow-lg transition">
      <img src="${p.img}" alt="${p[lang]}" class="w-full h-48 object-cover bg-[#d9cfc4]">
      <div class="p-4 flex items-center justify-between gap-2">
        <div>
          <h3 class="font-bold text-lg">${p[lang]}</h3>
          <p class="text-[#4f6b4a] font-semibold">${p.price} ${t("currency")}</p>
        </div>
        <button onclick="addToCart(${p.id})" class="add-btn bg-[#2b1d16] text-white px-4 py-2 rounded-full hover:bg-[#4f6b4a] transition">${t("add")}</button>
      </div>
    </div>`;
}

function renderMenu() {
  let html = "";
  products.forEach(function (p) {
    if (currentFilter === "all" || p.type === currentFilter) html += productCard(p);
  });
  document.getElementById("products").innerHTML = html;
}

function renderFeatured() {
  let html = "";
  products.slice(0, 3).forEach(function (p) { html += productCard(p); });
  document.getElementById("featured").innerHTML = html;
}

// ===================== السلة =====================
function renderCart() {
  const box = document.getElementById("cart-items");
  const cart = getCart();

  if (cart.length === 0) {
    box.innerHTML = '<p class="text-center py-10 text-gray-500">' + t("cart_empty") + ' <a href="#menu" class="underline text-[#4f6b4a]">' + t("see_menu") + '</a></p>';
    document.getElementById("cart-total").textContent = "0";
    document.getElementById("checkout-btn").classList.add("hidden");
    return;
  }

  let html = "";
  cart.forEach(function (item) {
    const p = findProduct(item.id);
    html += `
      <div class="flex items-center gap-4 bg-white rounded-xl p-3 shadow">
        <img src="${p.img}" alt="${p[lang]}" class="w-20 h-20 rounded-lg object-cover bg-[#d9cfc4]">
        <div class="flex-1">
          <h3 class="font-bold">${p[lang]}</h3>
          <p class="text-gray-500">${p.price} ${t("currency")}</p>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="changeQty(${p.id}, -1)" class="w-8 h-8 rounded-full bg-gray-200 text-[#2b1d16]">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${p.id}, 1)" class="w-8 h-8 rounded-full bg-gray-200 text-[#2b1d16]">+</button>
        </div>
      </div>`;
  });
  box.innerHTML = html;
  document.getElementById("cart-total").textContent = getTotal();
  document.getElementById("checkout-btn").classList.remove("hidden");
}

// ===================== الدفع =====================
function renderCheckout() {
  let html = "";
  getCart().forEach(function (item) {
    const p = findProduct(item.id);
    html += `<div class="flex justify-between py-1"><span>${p[lang]} × ${item.qty}</span><span>${p.price * item.qty} ${t("currency")}</span></div>`;
  });
  document.getElementById("summary").innerHTML = html || t("cart_empty");
  document.getElementById("checkout-total").textContent = getTotal();
}

document.getElementById("checkout-form").addEventListener("submit", function (e) {
  e.preventDefault(); // نمنع الصفحة من إعادة التحميل
  if (getCart().length === 0) {
    showToast(t("cart_empty"));
    return;
  }
  localStorage.removeItem("cart");
  updateCount();
  document.getElementById("checkout-box").classList.add("hidden");
  document.getElementById("success").classList.remove("hidden");
});

// ===================== تغيير اللغة =====================
function applyLang() {
  // اتجاه الصفحة: عربي يمين، إنجليزي يسار
  document.documentElement.lang = lang;
  document.documentElement.dir = (lang === "ar") ? "rtl" : "ltr";
  document.title = t("brand");

  // كل عنصر عليه data-i18n نغير نصه
  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    el.textContent = t(el.dataset.i18n);
  });
  // الـ placeholder في النموذج
  document.querySelectorAll("[data-ph]").forEach(function (el) {
    el.placeholder = t(el.dataset.ph);
  });

  // الزر يعرض اللغة الثانية
  document.getElementById("lang-btn").textContent = (lang === "ar") ? "EN" : "عربي";

  // نعيد رسم الأجزاء اللي فيها منتجات
  renderFeatured();
  renderMenu();
  renderCart();
  renderCheckout();
}

document.getElementById("lang-btn").addEventListener("click", function () {
  lang = (lang === "ar") ? "en" : "ar";
  localStorage.setItem("lang", lang);
  applyLang();
});

// ===================== الدارك مود =====================
function updateThemeIcon() {
  const dark = document.documentElement.classList.contains("dark");
  document.getElementById("theme-btn").textContent = dark ? "☀️" : "🌙";
}

document.getElementById("theme-btn").addEventListener("click", function () {
  document.documentElement.classList.toggle("dark");
  const dark = document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", dark ? "dark" : "light");
  updateThemeIcon();
});

// ===================== التنقل بين الصفحات =====================
// كل صفحة هي section لها id، والرابط (#menu مثلاً) يحدد أي صفحة تظهر
function showPage() {
  const name = location.hash.replace("#", "") || "home";
  const newPage = document.getElementById(name) || document.getElementById("home");
  const oldPage = document.querySelector(".page:not(.hidden)");

  // نخفي الصفحة القديمة بنعومة، وبعدها نظهر الجديدة
  oldPage.classList.add("fade");
  setTimeout(function () {
    oldPage.classList.add("hidden");
    oldPage.classList.remove("fade");

    // نجهز محتوى الصفحة قبل ما تظهر
    if (newPage.id === "cart") renderCart();
    if (newPage.id === "checkout") {
      renderCheckout();
      document.getElementById("checkout-box").classList.remove("hidden");
      document.getElementById("success").classList.add("hidden");
    }

    newPage.classList.add("fade");
    newPage.classList.remove("hidden");
    window.scrollTo(0, 0);
    setTimeout(function () { newPage.classList.remove("fade"); }, 20);
  }, 250);

  // نلوّن رابط الصفحة الحالية
  document.querySelectorAll(".nav-link").forEach(function (a) {
    a.classList.toggle("active", a.getAttribute("href") === "#" + newPage.id);
  });
  document.getElementById("mobile-menu").classList.add("hidden");
}

window.addEventListener("hashchange", showPage);

// ===================== الهمبرقر + لفوق + الهيدر =====================
document.getElementById("burger").addEventListener("click", function () {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});

const header = document.getElementById("header");
const topBtn = document.getElementById("top-btn");

window.addEventListener("scroll", function () {
  header.classList.toggle("scrolled", window.scrollY > 20);
  topBtn.classList.toggle("show", window.scrollY > 300);
});

topBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===================== فلتر المنيو =====================
document.querySelectorAll(".filter-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderMenu();
  });
});

// ===================== تشغيل الموقع =====================
updateCount();
updateThemeIcon();
applyLang();
showPage();
