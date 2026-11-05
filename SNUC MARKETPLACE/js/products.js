function getProducts(){return JSON.parse(localStorage.getItem('snuProducts')||'[]')}
function saveProducts(p){localStorage.setItem('snuProducts',JSON.stringify(p))}
function money(n){return '₹'+Number(n).toLocaleString('en-IN')}
document.addEventListener('DOMContentLoaded',()=>{
const current=JSON.parse(localStorage.getItem('snuCurrentUser')||'null');
const form=document.getElementById('sellForm'),msg=document.getElementById('formMessage');
if(form)form.addEventListener('submit',e=>{e.preventDefault();if(!current){msg.textContent='Please login before posting an item.';setTimeout(()=>location.href='login.html',900);return}
let file=document.getElementById('image').files[0],reader;
const create=image=>{let p=getProducts();p.unshift({id:Date.now(),title:document.getElementById('title').value.trim(),price:Number(document.getElementById('price').value),category:document.getElementById('category').value,description:document.getElementById('description').value.trim(),image:image||'images/books.jpg',seller:current.name,email:current.email,sellerId:current.id});saveProducts(p);location.href='my-listings.html'};
if(file){reader=new FileReader();reader.onload=()=>create(reader.result);reader.readAsDataURL(file)}else create(null)});
const mine=document.getElementById('myListings');if(mine){if(!current){mine.innerHTML='<div class="empty">Please <a href="login.html">login</a> to view your listings.</div>';return}
let p=getProducts().filter(x=>x.sellerId===current.id||x.email===current.email);mine.innerHTML=p.length?p.map(x=>`<article class="product-card"><img src="${x.image}" alt="${x.title}"><div class="card-body"><h3>${x.title}</h3><p class="price">${money(x.price)}</p><span class="meta">${x.category}</span></div><div class="actions"><button class="small-btn delete" onclick="removeProduct(${x.id})">Delete listing</button></div></article>`).join(''):'<div class="empty">You have not listed any items yet. <a href="sell.html">Sell your first item →</a></div>'}
const details=document.getElementById('productDetails');if(details){let id=Number(new URLSearchParams(location.search).get('id')),x=getProducts().find(p=>p.id===id);if(!x){details.innerHTML='<div class="empty">Product not found. <a href="index.html">Back to marketplace</a></div>';return}
details.innerHTML=`<a href="index.html">← Back to listings</a><div class="product-detail"><img src="${x.image}" alt="${x.title}"><div><span class="eyebrow">${x.category}</span><h1>${x.title}</h1><p class="price">${money(x.price)}</p><p>${x.description}</p><div class="trust"><div>👤 <b>Seller</b><span>${x.seller||'SNU Student'}</span></div><div>📍 <b>Campus exchange</b><span>Arrange a safe public campus meetup</span></div></div><p><a class="btn" href="chat.html?productId=${x.id}&sellerEmail=${encodeURIComponent(x.email||'')}&sellerName=${encodeURIComponent(x.seller||'SNU Student')}">💬 Message seller</a></p><small class="muted">Please inspect items and exchange in a safe public place on campus.</small></div></div>`}
});
function removeProduct(id){if(!confirm('Delete this listing?'))return;saveProducts(getProducts().filter(p=>p.id!==id));location.reload()}
