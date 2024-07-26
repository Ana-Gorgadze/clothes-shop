// Variables
let cart = [];
const cartContent = document.querySelector('.cart-content');
const totalPriceElement = document.querySelector('.total-price');
const cartIcon = document.querySelector('.fa-cart-shopping');
const closeCart = document.getElementById('close-cart');
const cartElement = document.querySelector('.cart');
const searchInput = document.getElementById('search-item');
const productItems = document.querySelectorAll('.product');
const addCartButtons = document.querySelectorAll('.product button');

// Functions
function addToCart(item) {
    const cartItem = cart.find(cartItem => cartItem.title === item.title);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push(item);
    }
    renderCart();
}

function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title);
    renderCart();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.innerText = `${total}$`;
}

function renderCart() {
    cartContent.innerHTML = '';
    cart.forEach(item => {
        const cartBox = document.createElement('div');
        cartBox.classList.add('cart-box');
        cartBox.innerHTML = `
            <img src="${item.imgSrc}" alt="" class="cart-img">
            <div class="detail-box">
                <div class="cart-product-title">${item.title}</div>
                <div class="cart-price">${item.price}$</div>
                <input type="number" value="${item.quantity}" class="cart-quantity" min="1">
            </div>
            <i class="fa-solid fa-trash cart-remove"></i>
        `;
        cartContent.appendChild(cartBox);

        cartBox.querySelector('.cart-remove').addEventListener('click', () => {
            removeFromCart(item.title);
        });

        cartBox.querySelector('.cart-quantity').addEventListener('change', (e) => {
            let quantity = parseInt(e.target.value);
            if (quantity < 1) {
                quantity = 1;
                e.target.value = 1;
            }
            item.quantity = quantity;
            updateTotal();
        });
    });
    updateTotal();
}

function search() {
    const searchValue = searchInput.value.toLowerCase();
    productItems.forEach(item => {
        const title = item.querySelector('h2').innerText.toLowerCase();
        if (title.includes(searchValue)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// Event Listeners
addCartButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const product = productItems[index];
        const title = product.querySelector('h2').innerText;
        const price = parseInt(product.querySelector('span').innerText.replace('$', ''));
        const imgSrc = product.querySelector('img').src;
        addToCart({ title, price, imgSrc, quantity: 1 });
    });
});

cartIcon.addEventListener('click', () => {
    cartElement.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartElement.classList.remove('active');
});

searchInput.addEventListener('input', search);

// Initial call
renderCart();
