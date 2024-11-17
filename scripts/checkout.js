import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let cartSummaryHtml = '';

// Iterate over each item in the cart
cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // Use find() to get the matching product efficiently
  const matchingProduct = products.find(product => product.id === productId);

  if (matchingProduct) {
    cartSummaryHtml += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name}">

        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
            <span class="update-quantity-link link-primary">Update</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">Choose a delivery option:</div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
});


document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;

// Add event listeners to delete buttons
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;

    // Remove the product from the cart array
    removeFromCart(productId);

    // Find and remove the corresponding cart item container from the DOM
    const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    if (cartItemContainer) {
      cartItemContainer.remove();  // Remove the element from the DOM
    }

    // Optionally, you could also re-render the cart summary to ensure the UI is updated correctly.
    // (e.g., regenerate cartSummaryHtml and inject it back into the DOM)
    console.log(cart); // Log the updated cart
  });
});
