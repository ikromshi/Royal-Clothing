import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { CartItem } from "./cart.types";


const selectCartReducer = (state: any): CartState => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer], 
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector(
  [selectCartItems], 
  (cartItems) => cartItems.reduce((preVal, curVal) => preVal + curVal.quantity, 0)
);


export const selectCartTotal = createSelector(
  [selectCartItems], 
  (cartItems) => cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0)
);
