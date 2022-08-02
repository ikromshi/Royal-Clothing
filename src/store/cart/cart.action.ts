import { CartItem, CART_ACTION_TYPES } from "./cart.types";
import { ActionWithPaylaod, createAction, withMatcher } from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";


const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const removeCartItem = (cartItems: CartItem[], productToRemove: CartItem): CartItem[] => {
  // find if "cartItems" contains productToRemove;
  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

  // if found, decrement quantity and return the array;
  if (existingCartItem) {
    return cartItems.map(cartItem => cartItem.id === existingCartItem.id ? 
    {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
  };

  return cartItems;
};

const clearCartItem = (cartItems: CartItem[], productToDelete: CartItem): CartItem[] => 
  cartItems.filter(cartItem => cartItem.id !== productToDelete.id);


export type SetIscartOpen = ActionWithPaylaod<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPaylaod<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;


export const setIsCartOpen = withMatcher((bool: boolean): SetIscartOpen => 
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

export const SetCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => 
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems));

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return SetCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CartItem) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return SetCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], productToDelete: CartItem) => {
  const newCartItems = clearCartItem(cartItems, productToDelete);
  return SetCartItems(newCartItems);
};

export const emptyItemsFromCart = () => {
  return createAction(CART_ACTION_TYPES.EMPTY_ITEMS, []);
}