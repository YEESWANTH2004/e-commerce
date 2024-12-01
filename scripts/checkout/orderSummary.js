import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryoption.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary(){
  let cartSummaryHtml = '';

  // Iterate over each item in the cart
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // Use find() to get the matching product efficiently
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
      const deliveryDate = today.add(
          deliveryOption.deliveryTime,
          'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

    if (matchingProduct) {
      cartSummaryHtml += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}" alt="${matchingProduct.name}">

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
              </span>
              <input class ="quantity-input js-quantity-input-${matchingProduct.id}">
              <span class ="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>
          <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
            ${deliveryOptionsHTML(matchingProduct,cartItem)}
          </div>
        </div>
      </div>
      `;
    }
  });

  function deliveryOptionsHTML(matchingProduct,cartItem) {

    let html = ' ';
    deliveryOptions.forEach((deliveryOption) =>{
      const today = dayjs();
      const deliveryDate = today.add(
          deliveryOption.deliveryTime,
          'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.priceCents 
      === 0 
      ?'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
    <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
            <input type="radio" 
            ${isChecked ? 'checked': ''}
            class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">${dateString}</div>
              <div class="delivery-option-price">${priceString} Shipping</div>
            </div>
          </div>
    `
    });
    return html;

  }


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

      updateCheckout();
      renderPaymentSummary();
    });
  });

  function updateCheckout(){
    const cartQuantity = calculateCartQuantity();

      document.querySelector('.js-checkout').innerHTML = `${cartQuantity} items`;

  }
  updateCheckout();

  document.querySelectorAll('.js-update-link')
      .forEach((link) =>{
        link.addEventListener('click',()=>{
          const productId = link.dataset.productId;
          const container = document.querySelector(
            `.js-cart-item-container-${productId}`
          );
    
          container.classList.add('is-editing-quantity');
        });
      });

  document.querySelectorAll('.js-save-link')
      .forEach((link) =>{
        link.addEventListener('click',()=>{
          const productId = link.dataset.productId;

          const quantityInput = document.querySelector(
            `.js-quantity-input-${productId}`
          );


          const newQuantity = Number(quantityInput.value);

          if(newQuantity < 0 || newQuantity>1000){
            alert("Qunatity must be atleast 0 and less than 1000");
            return;
          }
          updateQuantity(productId,newQuantity);

          const container = document.querySelector(
            `.js-cart-item-container-${productId}`
          );
          container.classList.remove('is-editing-quantity');

          const quantityLabel = document.querySelector(
            `.js-quantity-label-${productId}`
          );
          quantityLabel.innerHTML = newQuantity;

        updateCheckout();
        });
      });

  document.querySelectorAll('.js-delivery-option')
      .forEach((element) =>{
        element.addEventListener('click', ()=>{
          const {productId,deliveryOptionId} = element.dataset;
          updateDeliveryOption(productId,deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
        })
      }); 
    }
