the website is deployed at :  https://karthikeyan770.github.io/IntraCampus-Buy-and-Sell/

# SNU Campus Marketplace
A front-end prototype for a student-to-student buy & sell platform for Shiv Nadar University, Chennai.

## Stack (minimal)
- HTML
- CSS
- JavaScript
- MySQL (schema supplied)

## Run
1. Extract the ZIP.
2. Open `index.html` in Chrome/Edge (recommended: VS Code Live Server).
3. Register a demo account, log in, publish listings, search/filter, view product details and manage your listings.

## Demo data & persistence
The home page seeds four sample listings. Browser interactions persist in `localStorage`:
- `snuUsers`: demo accounts
- `snuCurrentUser`: current demo session
- `snuProducts`: listings

## MySQL
Open MySQL Workbench, create a SQL tab, open `database/database.sql`, and execute it.

## Important architecture note
This ZIP is a self-contained browser prototype. Browser JavaScript cannot safely connect directly to MySQL. The SQL schema is ready, but live MySQL persistence requires a server-side layer (for example PHP or Node/Express), which has intentionally not been included because you asked to keep the stack limited to HTML, CSS, JavaScript and MySQL.

## Pages
- `index.html`: home, categories, search and product cards
- `register.html`, `login.html`: demo registration/authentication
- `sell.html`: create a listing (supports local image upload)
- `product.html`: details and contact seller
- `my-listings.html`: delete your own demo listings

## Safety
Use university email addresses for demo accounts; meet in public campus areas and inspect items before exchange. Demo passwords are stored in browser localStorage and are NOT secure for production.
