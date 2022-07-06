import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  clearItemFromCart: () => {},
  removeItemFromCart: () => {},
  cartTotal: 0
});


const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN"
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state, 
        ...payload
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      };
    default:
      throw new Error(`Unhandled type ${type} of error in cartReducee`);
  };
};


export const CartProvider = ({children}) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    // Resetting cartCount every time "cartItems" changes;
    const newCartCount = newCartItems.reduce((preVal, curVal) => preVal + curVal.quantity, 0);
    
    // Keeping track of the total price on the checkout page
    const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity*cartItem.price, 0);
    
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount }));
  };


  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (productToDelete) => {
    const newCartItems = clearCartItem(cartItems, productToDelete);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  const value = { 
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart,
    removeItemFromCart, 
    cartItems, 
    cartCount, 
    clearItemFromCart,
    cartTotal
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};