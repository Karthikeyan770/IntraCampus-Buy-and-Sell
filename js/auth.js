const USERS='snuUsers',CURRENT='snuCurrentUser';
document.addEventListener('DOMContentLoaded',()=>{
const reg=document.getElementById('registerForm'),login=document.getElementById('loginForm'),msg=document.getElementById('formMessage');
if(reg)reg.addEventListener('submit',e=>{e.preventDefault();let users=JSON.parse(localStorage.getItem(USERS)||'[]'),name=document.getElementById('name').value.trim(),email=document.getElementById('email').value.trim().toLowerCase(),password=document.getElementById('password').value;
if(!email.endsWith('.edu.in')&&!email.includes('snuchennai')){msg.textContent='Please use your university email address (demo validation).';return}
if(users.some(u=>u.email===email)){msg.textContent='This email is already registered. Please login.';return}
let u={id:Date.now(),name,email,password};users.push(u);localStorage.setItem(USERS,JSON.stringify(users));localStorage.setItem(CURRENT,JSON.stringify({id:u.id,name:u.name,email:u.email}));location.href='index.html'});
if(login)login.addEventListener('submit',e=>{e.preventDefault();let email=document.getElementById('email').value.trim().toLowerCase(),password=document.getElementById('password').value,users=JSON.parse(localStorage.getItem(USERS)||'[]'),u=users.find(x=>x.email===email&&x.password===password);
if(!u){msg.textContent='Invalid email or password. Register first or try again.';return}
localStorage.setItem(CURRENT,JSON.stringify({id:u.id,name:u.name,email:u.email}));location.href='index.html'});
});
