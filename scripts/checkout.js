import {renderCheckoutHeader} from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

async function loadPage(){
 try{

  await loadProductsFetch(); 
 
 const value = await new Promise((resolve, reject) =>{
  loadCart(() =>{
    // reject('error3');
    resolve('value3');
  });
 });
 }

 catch(error){
  console.log('Unexpected error. Please try again')
 }
   renderCheckoutHeader();
   renderOrderSummary();
   renderPaymentSummary();

}
loadPage();


/*
Promise.all([
   loadProductsFetch(),
  new Promise((resolve) =>{
    loadCart(() =>{
      resolve();
    });
   })

]).then((values) =>{
  console.log(values);
   renderCheckoutHeader();
   renderOrderSummary();
   renderPaymentSummary();
});
*/


/*
new Promise((resolve) =>{
  loadProducts(() =>{
    resolve('value1');
  });

}).then((value) =>{
  console.log(value)
 return new Promise((resolve) =>{
  loadCart(() =>{
    resolve();
  });
 });

}).then(() =>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });

*/


/*
loadProducts(() =>{
  loadCart(() =>{
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
  
});
*/
