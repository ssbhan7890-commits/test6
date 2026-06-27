// ================================
// عمارت 5 دری - Premium V2
// ================================

// محصولات پیش‌فرض در اولین اجرا

const defaultProducts = [

{
id:1,
title:"کاغذ دیواری کلاسیک طلایی",
price:1250000,
category:"کاغذ دیواری",
image:"wallpaper.jpg"
},

{
id:2,
title:"پرده زبرا مدرن",
price:2100000,
category:"پرده",
image:"curtain.jpg"
},

{
id:3,
title:"قرنیز PVC لوکس",
price:450000,
category:"قرنیز",
image:"cornice.jpg"
},

{
id:4,
title:"تی وی وال مدرن",
price:4800000,
category:"تی وی وال",
image:"tvwall.jpg"
}

];

// اولین اجرا

if(!localStorage.getItem("products")){

localStorage.setItem(
"products",
JSON.stringify(defaultProducts)
);

}

// دریافت محصولات

function getProducts(){

return JSON.parse(
localStorage.getItem("products")
) || [];

}

// فرمت قیمت

function formatPrice(price){

return Number(price).toLocaleString("fa-IR");

}

// نمایش محصولات

function renderProducts(products){

const container =
document.getElementById("products");

if(!container) return;

container.innerHTML = "";

if(products.length === 0){

container.innerHTML = `

<div style="
text-align:center;
padding:50px;
width:100%;
">

محصولی یافت نشد

</div>

`;

return;

}

products.forEach(product=>{

container.innerHTML += `

<div class="product-card">

<img
src="${product.image}"
alt="${product.title}">

<div class="product-info">

<h3>
${product.title}
</h3>

<p>
${product.category}
</p>

<div class="price">

${formatPrice(product.price)}

تومان

</div>

<div style="
margin-top:15px;
display:flex;
gap:10px;
">

<a
href="tel:09140904541"
style="
flex:1;
text-align:center;
padding:10px;
background:#0f6d45;
color:white;
border-radius:10px;
text-decoration:none;
">

تماس

</a>

<a
href="https://eitaa.com/emarat_5dari"
target="_blank"
style="
flex:1;
text-align:center;
padding:10px;
background:#18b26c;
color:white;
border-radius:10px;
text-decoration:none;
">

ایتا

</a>

</div>

</div>

</div>

`;

});

}

// بارگذاری اولیه

window.addEventListener("DOMContentLoaded",()=>{

renderProducts(
getProducts()
);

});

// جستجو

function searchProducts(){

const searchInput =
document
.getElementById("searchInput")
.value
.toLowerCase();

const products =
getProducts();

const filteredProducts =
products.filter(product=>

product.title
.toLowerCase()
.includes(searchInput)

||

product.category
.toLowerCase()
.includes(searchInput)

);

renderProducts(
filteredProducts
);

}

// فیلتر دسته بندی

function filterCategory(category){

const products =
getProducts();

if(category === "all"){

renderProducts(products);

return;

}

const filteredProducts =
products.filter(product=>

product.category === category

);

renderProducts(
filteredProducts
);

}

// شمارنده بازدید

let views =
localStorage.getItem("siteViews");

if(!views){

views = 0;

}

views++;

localStorage.setItem(
"siteViews",
views
);

// نمایش تعداد بازدید

const viewBox =
document.getElementById("viewCounter");

if(viewBox){

viewBox.innerHTML =

`👁 ${views} بازدید`;

}

// اسکرول نرم

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

anchor.addEventListener(
"click",
function(e){

e.preventDefault();

document
.querySelector(
this.getAttribute("href")
)
.scrollIntoView({

behavior:"smooth"

});

});

});

// افکت نمایش هنگام اسکرول

const observer =
new IntersectionObserver(

entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"show"
);

}

});

},

{
threshold:0.2
}

);

document
.querySelectorAll(
".category-card,.product-card,.project-card"
)
.forEach(el=>{

observer.observe(el);

});

// پیام خوش آمد

console.log(
"Emarat 5 Dari Premium V2 Loaded"
);