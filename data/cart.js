export let cart = [];

// Load the cart from localStorage or initialize it as empty
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add a product to the cart or update its quantity
export function addToCart(productId, quantity = 1) {
  console.log('addToCart called with Product ID:', productId, 'Quantity:', quantity);

  const matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1', // Default delivery option
    });
  }

  saveToStorage();
  console.log(`Product added to cart: ${productId}, Quantity: ${quantity}`);
}

// Calculate total quantity of items in the cart
export function calculateCartQuantity() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Update quantity of a specific product in the cart
export function updateQuantity(productId, newQuantity) {
  const matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.quantity = newQuantity;
    saveToStorage();
  }
}

// Remove a product from the cart
export function removeFromCart(productId) {
  cart = cart.filter((item) => item.productId !== productId);
  saveToStorage();
}

// Update delivery option for a product
export function updateDeliveryOption(productId, deliveryOptionId) {
  const matchingItem = cart.find((item) => item.productId === productId);

  if (matchingItem) {
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
  }
}

// Load the cart data from the backend (optional)
export function loadCart(callback) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    callback();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

// Initialize the cart from localStorage
loadFromStorage();
