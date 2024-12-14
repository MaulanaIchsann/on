document.querySelector('#search-icon').onclick = () => {
  document.querySelector('.search-box').classList.toggle('active');
}

document.querySelector('#menu-icon').onclick = () => {
  document.querySelector('.navbar').classList.toggle('active');
}

// Search function
document.getElementById('search-input').addEventListener('keyup', function() {
  const searchInput = this.value.toLowerCase();
  const products = document.querySelectorAll('.box');

  products.forEach((product) => {
    const productName = product.querySelector('h3').innerText.toLowerCase();

    if (productName.includes(searchInput)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
});

// Cart toggle
document.getElementById("cart-icon").addEventListener("click", function() {
document.getElementById("cart-sidebar").classList.toggle("show");
});

document.addEventListener("click", function(event) {
  if (!event.target.closest("#cart-sidebar") && !event.target.closest("#cart-icon")) {
      document.getElementById("cart-sidebar").classList.remove("show");
  }
});

const cartSidebar = document.getElementById('cart-sidebar');
const cartTotal = document.getElementById('cart-total');
const cartItems = document.getElementById('cart-items');

// Add event listeners to each "Buy Now" button
const buyNowButtons = document.querySelectorAll('.box .content a');
buyNowButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
      e.preventDefault();
      const product = button.parentNode.parentNode;
      const productName = product.querySelector('h3').textContent;
      const productPrice = parseFloat(product.querySelector('span').textContent.replace('Idr ', ''));
      addToCart(productName, productPrice);
  });
});

function addToCart(productName, productPrice) {
  const existingItem = cartItems.querySelector(`li[data-product="${productName}"]`);
  if (existingItem) {
      const quantity = existingItem.querySelector('span.quantity');
      quantity.textContent = parseInt(quantity.textContent, 10) + 1;
  } else {
      const cartItem = document.createElement('li');
      cartItem.dataset.product = productName;
      cartItem.innerHTML = `
          <span>${productName}</span>
          <span class="quantity">1</span>
          <span class="price">Idr ${productPrice}</span>
          <button class="remove">Remove</button>
          <button class="add">+</button>
          <button class="subtract">-</button>
      `;
      cartItems.appendChild(cartItem);
  }
  updateCartTotal();
}

cartItems.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
      e.target.parentNode.remove();
      updateCartTotal();
  } else if (e.target.classList.contains('add')) {
      const cartItem = e.target.closest('li');
      const quantity = cartItem.querySelector('span.quantity');
      quantity.textContent = parseInt(quantity.textContent, 10) + 1;
      updateCartTotal();
  } else if (e.target.classList.contains('subtract')) {
      const cartItem = e.target.closest('li');
      const quantity = cartItem.querySelector('span.quantity');
      if (parseInt(quantity.textContent, 10) > 1) {
          quantity.textContent = parseInt(quantity.textContent, 10) - 1;
      }
      updateCartTotal();
  }
});

function updateCartTotal() {
  const cartItemsList = document.querySelectorAll('#cart-items li');
  let total = 0;
  cartItemsList.forEach((item) => {
      const quantity = parseInt(item.querySelector('span.quantity').textContent, 10);
      const price = parseFloat(item.querySelector('span.price').textContent.replace('Idr ', ''));
      total += quantity * price;
  });
  cartTotal.textContent = `Idr ${total}`;
}

const checkoutButton = document.getElementById('checkout');
const checkoutForm = document.getElementById('checkout-form');

checkoutButton.addEventListener('click', () => {
  checkoutForm.style.display = checkoutForm.style.display === 'none' ? 'block' : 'none';
});

// checkout
document.getElementById('confirm').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const items = [];

  document.querySelectorAll('#cart-items li').forEach((item) => {
      const product = item.querySelector('span').textContent;
      const quantity = item.querySelector('span.quantity').textContent;
      items.push({ product, quantity });
  });

  const orderData = {
      name,address,phone,items,total: document.getElementById('cart-total').textContent};

  localStorage.setItem('orderData', JSON.stringify(orderData));
  window.location.href = 'payment.html';
});



    // Temukan elemen ikon logout
    const logoutIcon = document.getElementById('logout-icon');

    // Tambahkan event listener untuk klik pada ikon logout
    logoutIcon.addEventListener('click', function() {
        // Redirect ke halaman login (hcww.html)
        window.location.href = 'index.html';
    });

