const seedProducts=[
{id:1,title:"CS Textbook Set",price:1200,category:"Books & Academic",description:"Data Structures, Algorithms and Operating Systems. Good condition.",image:"images/books.jpg",seller:"Campus Seller",email:"seller@snuchennai.edu.in"},
{id:2,title:"HP Laptop (i5, 8GB)",price:28000,category:"Electronics & Gadgets",description:"Reliable laptop for coding and coursework. Contact for details.",image:"images/laptop.jpg",seller:"Campus Seller",email:"seller@snuchennai.edu.in"},
{id:3,title:"Sony Headphones",price:2800,category:"Electronics & Gadgets",description:"Over-ear headphones, lightly used. Works perfectly.",image:"images/headphones.jpg",seller:"Campus Seller",email:"seller@snuchennai.edu.in"},
{id:4,title:"Study Chair",price:1500,category:"Hostel Essentials",description:"Comfortable study chair. Great for hostel room.",image:"images/chair.jpg",seller:"Campus Seller",email:"seller@snuchennai.edu.in"}];
function getProducts(){let p=JSON.parse(localStorage.getItem('snuProducts')||'null');if(!p){p=seedProducts;localStorage.setItem('snuProducts',JSON.stringify(p))}return p}
function money(n){return '₹'+Number(n).toLocaleString('en-IN')}
function card(p){return `<article class="product-card"><a href="product.html?id=${p.id}"><img src="${p.image||'images/books.jpg'}" alt="${p.title}"><div class="card-body"><h3>${p.title}</h3><p class="price">${money(p.price)}</p><div class="meta">♧ ${p.category}</div></div></a></article>`}
function render(){let q=(document.getElementById('searchInput')?.value||'').toLowerCase(),cat=document.getElementById('categoryFilter')?.value||'';let p=getProducts().filter(x=>(x.title+' '+x.category+' '+x.description).toLowerCase().includes(q)&&(!cat||x.category===cat));document.getElementById('productGrid').innerHTML=p.length?p.map(card).join(''):'<div class="empty">No matching listings. Try another search.</div>';document.getElementById('listingCount').textContent=p.length+' items'}
document.addEventListener('DOMContentLoaded',()=>{if(document.getElementById('productGrid')){render();document.getElementById('searchInput').addEventListener('input',render);document.getElementById('categoryFilter').addEventListener('change',render);document.querySelectorAll('[data-cat]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('categoryFilter').value=b.dataset.cat;render();document.getElementById('listings').scrollIntoView({behavior:'smooth'})}))}
let u=JSON.parse(localStorage.getItem('snuCurrentUser')||'null');
if(u){
 document.getElementById('loginNav')?.classList.add('hidden');
 document.getElementById('registerNav')?.classList.add('hidden');
 if(document.getElementById('userNav')) document.getElementById('userNav').innerHTML=`Hi, ${u.name.split(' ')[0]} <button class="small-btn" onclick="logout()">Logout</button>`;
 // Prevent signed-in users from opening Login/Register pages again.
 if(['login.html','register.html'].includes(location.pathname.split('/').pop())) location.replace('index.html');
}});
function logout(){localStorage.removeItem('snuCurrentUser');location.reload()}
