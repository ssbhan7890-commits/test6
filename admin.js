// ================================
// عمارت 5 دری - Admin Panel V2
// ================================

const ADMIN_PASSWORD = "emarat@50222915";

// ورود مدیر

function login(){

const password =
document.getElementById("password").value;

if(password === ADMIN_PASSWORD){

document.getElementById("loginPage").style.display = "none";

document.getElementById("dashboard").style.display = "block";

loadDashboard();

}else{

alert("رمز عبور اشتباه است");

}

}

// محصولات

function getProducts(){

return JSON.parse(
localStorage.getItem("products")
) || [];

}

function saveProducts(products){

localStorage.setItem(
"products",
JSON.stringify(products)
);

}

// داشبورد

function loadDashboard(){

updateStats();

loadProducts();

}

// آمار

function updateStats(){

const products = getProducts();

document.getElementById(
"productCount"
).innerText = products.length;

const views =
localStorage.getItem("siteViews") || 0;

document.getElementById(
"siteViews"
).innerText = views;

}

// افزودن محصول

function addProduct(){

const title =
document.getElementById("title").value;

const price =
document.getElementById("price").value;

const category =
document.getElementById("category").value;

const imageFile =
document.getElementById("imageFile").files[0];

if(
!title ||
!price ||
!imageFile
){

alert("تمام فیلدها را کامل کنید");
return;

}

const reader =
new FileReader();

reader.onload = function(e){

const products =
getProducts();

products.push({

id: Date.now(),

title: title,

price: price,

category: category,

image: e.target.result

});

saveProducts(products);

clearForm();

loadDashboard();

alert("محصول با موفقیت ثبت شد");

}

reader.readAsDataURL(imageFile);

}

// پاک کردن فرم

function clearForm(){

document.getElementById("title").value = "";

document.getElementById("price").value = "";

document.getElementById("imageFile").value = "";

}

// نمایش محصولات

function loadProducts(){

const products =
getProducts();

const container =
document.getElementById("productsList");

container.innerHTML = "";

if(products.length === 0){

container.innerHTML =
"<p>هیچ محصولی ثبت نشده است.</p>";

return;

}

products.forEach(product => {

container.innerHTML += `

<div class="product-item">

<div style="display:flex;align-items:center;gap:15px;">

<img src="${product.image}">

<div>

<h4>${product.title}</h4>

<p>${product.category}</p>

<p>
${Number(product.price).toLocaleString("fa-IR")}
تومان
</p>

</div>

</div>

<div>

<button
class="edit-btn"
onclick="editProduct(${product.id})">

ویرایش

</button>

<button
class="delete-btn"
onclick="deleteProduct(${product.id})">

حذف

</button>

</div>

</div>

`;

});

}

// حذف محصول

function deleteProduct(id){

if(!confirm("محصول حذف شود؟"))
return;

let products =
getProducts();

products =
products.filter(product =>
product.id !== id
);

saveProducts(products);

loadDashboard();

}

// ویرایش محصول

function editProduct(id){

const products =
getProducts();

const product =
products.find(
item => item.id === id
);

if(!product) return;

const newTitle =
prompt(
"نام جدید محصول",
product.title
);

if(newTitle === null)
return;

const newPrice =
prompt(
"قیمت جدید",
product.price
);

if(newPrice === null)
return;

product.title = newTitle;
product.price = newPrice;

saveProducts(products);

loadDashboard();

alert("ویرایش انجام شد");

}

// خروج

function logout(){

location.reload();

}

// کلید Enter برای ورود

document.addEventListener(
"keydown",
function(e){

if(
e.key === "Enter" &&
document.getElementById("loginPage")
.style.display !== "none"
){

login();

}

}
);

console.log(
"Emarat 5 Dari Admin V2 Loaded"
);