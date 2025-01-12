
import { getProduct, loadProductsFetch } from '../data/products.js';
import { orders, deleteOrder } from '../data/orders.js'; 
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrency from './utils/money.js';
import { addToCart, calculateCartQuantity } from '../data/cart.js';

async function loadPage() {
  await loadProductsFetch();

  let ordersHTML = '';

  orders.forEach((order) => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    ordersHTML += `
      <div class="order-container" data-order-id="${order.id}">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productsListHTML(order)}
        </div>
        <!-- Delete Button -->
        <div class="order-delete">
          <button class="delete-order-button button-danger js-delete-order" data-order-id="${order.id}">
            Delete Order
          </button>
        </div>
      </div>
    `;
  });

  function updateToCart() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  updateToCart();  // Update cart quantity right after loading the page

  function productsListHTML(order) {
    let productsListHTML = '';

    order.products.forEach((productDetails) => {
      const product = getProduct(productDetails.productId);

      productsListHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>
        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${
              dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
            }
          </div>
          <div class="product-quantity">
            Quantity: <span class="js-product-quantity">${productDetails.quantity}</span>
          </div>
          <button class="buy-again-button button-primary js-buy-again"
            data-product-id="${product.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    return productsListHTML;
  }

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

  document.querySelectorAll('.js-buy-again').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      addToCart(productId);  // Adds the product to the cart

      // Update the cart quantity display immediately
      updateToCart();

      const orderProductElement = button.closest('.order-container').querySelector(`[data-product-id="${productId}"] .js-product-quantity`);
      if (orderProductElement) {
        const currentQuantity = Number(orderProductElement.innerHTML);
        orderProductElement.innerHTML = currentQuantity + 1;  // Increase the quantity by 1
      }

      // Feedback to user
      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    });
  });

  // Handle Delete Order Button Click
  document.querySelectorAll('.js-delete-order').forEach((button) => {
    button.addEventListener('click', (e) => {
      const orderId = e.target.dataset.orderId;

      // Delete the order (assuming deleteOrder is defined)
      deleteOrder(orderId);

      // Re-load the page content to show the updated orders
      loadPage();
    });
  });
}

loadPage();
