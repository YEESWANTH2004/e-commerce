import { addToCart, cart, loadFromStorage } from '../../data/cart.js';

describe('test suite : addToCart', () => {
  
  // Setup spy on localStorage before each test
  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);  // Mocking an empty cart
    });
    spyOn(localStorage, 'setItem').and.callThrough();  // Spying on setItem
    spyOn(document, 'querySelector').and.returnValue({ value: '1' });  // Mocking quantity selector
  });

  it('adds an existing product to the cart', () => {
    // Test logic for adding an existing product (currently empty)
  });

  it('adds a new product to the cart', () => {
    loadFromStorage();  // Load empty cart from localStorage
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');  // Adding a new product to the cart
    
    expect(cart.length).toEqual(1);  // Verify the cart length
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);  // Verify setItem was called once
  });
});
