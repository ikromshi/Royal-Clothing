

// Resetting cartCount every time "cartItems" changes;
const newCartCount = newCartItems.reduce((preVal, curVal) => preVal + curVal.quantity, 0);
  
// Keeping track of the total price on the checkout page
const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0);
