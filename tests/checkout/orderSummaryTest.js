import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js';
import { renderPaymentSummary } from '../../scripts/checkout/paymentSummary.js';
import {loadFromStorage,cart} from '../../data/cart.js';
import { loadProducts } from '../../data/products.js';

describe('test suite: renderOrderSummary', () => {

const prdId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const prdId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

beforeAll((done) =>{
  loadProducts(() =>{
    done();
  });
});

  beforeEach(() =>{
    spyOn(localStorage,'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-checkout"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: prdId1 ,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: prdId2,
        quantity: 1,
        deliveryOptionId: '2'
      }
    ]);
    });

    loadFromStorage();
    renderOrderSummary();
    renderPaymentSummary();
  });


  it('displays the cart', () => {
    expect(
      document.querySelectorAll('.js-cart-item-container').length
  ).toEqual(2);
  expect(
  document.querySelector(`.js-product-quantity-${prdId1}`).innerText
  ).toContain('Quantity: 2');
  expect(
    document.querySelector(`.js-product-quantity-${prdId2}`).innerText
    ).toContain('Quantity: 1');

    document.querySelector('.js-test-container').innerHTML = '';

  });

  it('removes a product', () =>{
    document.querySelector(`.js-delete-link-${prdId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
  ).toEqual(1);
  expect(
    document.querySelector(`.js-cart-item-container-${prdId1}`)
  ).toEqual(null);
  expect(
    document.querySelector(`.js-cart-item-container-${prdId2}`)
  ).not.toEqual(null);

  expect(
    cart.length
  ).toEqual(1);

  expect(
    cart[0].productId
  ).toEqual(prdId2);

  document.querySelector('.js-test-container').innerHTML = '';

  });
});
