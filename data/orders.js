export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

export function deleteOrder(orderId) {
  // Find the index of the order to delete
  const index = orders.findIndex(order => order.id === orderId);
  if (index !== -1) {
    orders.splice(index, 1); // Remove the order from the array
    saveToStorage(); // Save the updated orders back to localStorage
  }
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}