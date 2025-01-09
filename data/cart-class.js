class Cart{
  cartItems;

  #localStoragekey;

  constructor(localStoragekey){
    this.#localStoragekey = localStoragekey;
    this.#loadFromStorage();
  }

  #loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStoragekey));
  if(!this.cartItems){
      this.cartItems = [{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:2,
        deliveryOptionId: '1'
      },{
        productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity:1,
        deliveryOptionId: '2'
      }];
  }
  }

  saveToStorage () {
    localStorage.setItem(this.#localStoragekey, JSON.stringify(this.cartItems));
  }

  addToCart(productId){
    console.log('addToCart called');
    let matchingItem;
  
      this.cartItems.forEach((item) => {
        if(productId === item.productId){
          matchingItem = item;
        }
      });
  
      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const quantity = Number(quantitySelector.value);
  
      if(matchingItem){
        matchingItem.quantity +=quantity;
      }
      else{
        this.cartItems.push({
        productId,
        quantity,
        deliveryOptionId: '1'
      });
      }
  
      this.saveToStorage(); 
  }

  calculateCartQuantity(){
    let cartQuantity = 0;
  
      this.cartItems.forEach((item)=>{
        cartQuantity += item.quantity;
      });
      
  return cartQuantity;
  }

  updateQuantity(productId,newQuantity){
    let matchingItem;
  
    this.cartItems.forEach((cartItem) =>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    matchingItem.quantity = newQuantity;
  
    this.saveToStorage();
  }

  removeFromCart(productId) {
    // Use filter to create a new array excluding the item with the matching productId
    this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
  
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
  
      this.cartItems.forEach((item) => {
        if(productId === item.productId){
          matchingItem = item;
        }
      });
  
      matchingItem.deliveryOptionId = deliveryOptionId;
  
      this.saveToStorage();
  }
}


const cart = new Cart('cart-oop');
const buisnessCart = new Cart('cart-business');



console.log(cart);
console.log(buisnessCart);

console.log(buisnessCart instanceof Cart);












