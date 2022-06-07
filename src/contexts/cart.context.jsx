import { createContext, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // find if "cartItems" contains productToAdd;
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

    // if found, increment quantity and return the array;
    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === existingCartItem.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    }

    // else, return a new array with modified cartItems/ new cart item;
    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

/**
 product {
    id,
    name,
    price,
    imgUrl
 }

 CartItem {
    id, 
    name,
    price, 
    imgUrl, 
    quantity
 }
 */