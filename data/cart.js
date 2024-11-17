export let cart =[{
  productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity:2
},{
  productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity:1
}];

export function addToCart(productId){
  let matchingItem;

    cart.forEach((item) => {
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
      cart.push({
      productId,
      quantity
    });
    }
}

export function removeFromCart(productId) {
  // Use filter to create a new array excluding the item with the matching productId
  cart = cart.filter(cartItem => cartItem.productId !== productId);
}
