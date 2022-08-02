import { AnyAction } from "redux";
import { SetCartItems, setIsCartOpen } from "./cart.action";
import { CartItem, CART_ACTION_TYPES  } from "./cart.types";

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
}

const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: []
};

export const cartReducer = (state=CART_INITIAL_STATE, action: AnyAction): CartState => {

  if (setIsCartOpen.match(action)) {
    return {...state, isCartOpen: action.payload};
  };

  if (SetCartItems.match(action)) {
    return {...state, cartItems: action.payload};
  };

  if (action.type === "cart/EMPTY_ITEMS") {
    return {...state, cartItems: action.payload};
  }
  return state;

  // switch(action.type) {
  //   case CART_ACTION_TYPES.SET_CART_ITEMS:
  //     return {
  //       ...state, 
  //       cartItems: action.payload
  //     };
  //   case CART_ACTION_TYPES.SET_IS_CART_OPEN:
  //     return {
  //       ...state,
  //       isCartOpen: action.payload
  //     };
  //   case CART_ACTION_TYPES.EMPTY_ITEMS:
  //     return {
  //       ...state,
  //       cartItems: action.payload
  //     };
  //   default:
  //     return state
  // };
};