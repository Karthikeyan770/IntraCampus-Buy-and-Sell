const MSG_KEY='snuMessages';
const getCurrent=()=>JSON.parse(localStorage.getItem('snuCurrentUser')||'null');
const getAllMessages=()=>JSON.parse(localStorage.getItem(MSG_KEY)||'[]');
const saveAllMessages=m=>localStorage.setItem(MSG_KEY,JSON.stringify(m));
const qp=new URLSearchParams(location.search);
const productId=qp.get('productId')||'';
const sellerEmail=(qp.get('sellerEmail')||'').toLowerCase();
const sellerName=qp.get('sellerName')||'Seller';
const current=getCurrent();
const norm=e=>(e||'').trim().toLowerCase();
const dateLabel=t=>new Date(t).toLocaleString([], {dateStyle:'medium',timeStyle:'short'});
function escapeHtml(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function conversationKey(a,b,p){return [norm(a),norm(b),String(p||'')].sort().join('::')+'::'+String(p||'')}
function otherEmail(m){return norm(m.senderEmail)===norm(current.email)?m.receiverEmail:m.senderEmail}
function renderInbox(){
 const el=document.getElementById('inbox'); if(!el)return;
 if(!current){el.innerHTML='<div class="empty">Please <a href="login.html">login</a> to use messaging.</div>';return}
 const msgs=getAllMessages().filter(m=>norm(m.senderEmail)===norm(current.email)||norm(m.receiverEmail)===norm(current.email));
 const grouped={};
 msgs.forEach(m=>{const other=otherEmail(m),key=conversationKey(current.email,other,m.productId);if(!grouped[key]||new Date(m.sentAt)>new Date(grouped[key].sentAt))grouped[key]=m});
 const threads=Object.values(grouped).sort((a,b)=>new Date(b.sentAt)-new Date(a.sentAt));
 if(!threads.length){el.innerHTML='<div class="empty inbox-empty"><div class="empty-icon">💬</div><h3>No conversations yet</h3><p>Open a listing and tap <b>Message seller</b> to start chatting.</p><a class="btn" href="index.html">Explore listings</a></div>';return}
 el.innerHTML=threads.map(m=>{const other=otherEmail(m),name=norm(m.senderEmail)===norm(current.email)?(m.receiverName||other):(m.senderName||other),unread='';return `<a class="thread-card" href="chat.html?partner=${encodeURIComponent(other)}&partnerName=${encodeURIComponent(name)}&productId=${encodeURIComponent(m.productId||'')}"><div class="thread-avatar">💬</div><div class="thread-content"><div class="thread-top"><strong>${escapeHtml(name)}</strong><time>${dateLabel(m.sentAt)}</time></div><p>${norm(m.senderEmail)===norm(current.email)?'You: ':''}${escapeHtml(m.text)}</p>${m.productTitle?`<span class="thread-product">Listing: ${escapeHtml(m.productTitle)}</span>`:''}</div></a>`}).join('');
}
function initChat(){
 const box=document.getElementById('chatMessages');if(!box)return;
 if(!current){box.innerHTML='<div class="empty">Please <a href="login.html">login</a> to message. <a href="login.html">Login</a></div>';document.getElementById('messageForm').style.display='none';return}
 const partner=norm(qp.get('partner')||sellerEmail);
 const partnerName=qp.get('partnerName')||sellerName;
 if(!partner||partner===norm(current.email)){box.innerHTML='<div class="empty">This conversation cannot be opened. Return to <a href="index.html">marketplace</a>.</div>';document.getElementById('messageForm').style.display='none';return}
 document.getElementById('chatTitle').textContent=partnerName;
 const product=JSON.parse(localStorage.getItem('snuProducts')||'[]').find(p=>String(p.id)===String(productId));
 document.getElementById('productContext').textContent=product?.title||qp.get('productTitle')||'Direct message';
 const render=()=>{
  const list=getAllMessages().filter(m=>((norm(m.senderEmail)===norm(current.email)&&norm(m.receiverEmail)===partner)||(norm(m.senderEmail)===partner&&norm(m.receiverEmail)===norm(current.email)))&&String(m.productId||'')===String(productId||'')).sort((a,b)=>new Date(a.sentAt)-new Date(b.sentAt));
  box.innerHTML=list.length?list.map(m=>`<div class="message-row ${norm(m.senderEmail)===norm(current.email)?'mine':'theirs'}"><div class="bubble">${escapeHtml(m.text)}<time>${dateLabel(m.sentAt)}</time></div></div>`).join(''):'<div class="chat-empty">Say hello! Ask about availability, condition or pickup.</div>';
  box.scrollTop=box.scrollHeight;
 };
 render();
 document.getElementById('messageForm').addEventListener('submit',e=>{
  e.preventDefault();const input=document.getElementById('messageInput'),text=input.value.trim();if(!text)return;
  const all=getAllMessages();all.push({id:Date.now(),senderEmail:current.email,senderName:current.name,receiverEmail:partner,receiverName:partnerName,productId:productId||null,productTitle:product?.title||qp.get('productTitle')||'',text,sentAt:new Date().toISOString()});
  saveAllMessages(all);input.value='';render();
 });
}
document.addEventListener('DOMContentLoaded',()=>{renderInbox();initChat()});
