import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";


const addCartItem = (cartItems, productToAdd) => {
  // find if "cartItems" contains productToAdd;
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

  // if found, increment quantity and return the array;
  if (existingCartItem) {
    return cartItems.map(cartItem => cartItem.id === existingCartItem.id ? 
    {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
  };

  // else, return a new array with modified cartItems/ new cart item;
  return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, productToRemove) => {
  // find if "cartItems" contains productToRemove;
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

  // if found, decrement quantity and return the array;
  if (existingCartItem) {
    return cartItems.map(cartItem => cartItem.id === existingCartItem.id ? 
    {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
  };
};

const clearCartItem = (cartItems, productToDelete) => cartItems.filter(cartItem => cartItem.id !== productToDelete.id);




export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, productToDelete) => {
  const newCartItems = clearCartItem(cartItems, productToDelete);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (bool) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);
};

export const emptyItemsFromCart = () => {
  return createAction(CART_ACTION_TYPES.EMPTY_ITEMS, []);
}