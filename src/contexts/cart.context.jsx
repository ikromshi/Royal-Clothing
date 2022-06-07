import { createContext, useState, useEffect } from "react";

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

const removeCartItem = (cartItems, productToRemove) => {
    // find if "cartItems" contains productToRemove;
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToRemove.id);

    // if found, decrement quantity and return the array;
    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === existingCartItem.id ? 
            {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
    }
}

const clearCartItem = (cartItems, productToDelete) => cartItems.filter(cartItem => cartItem.id !== productToDelete.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    clearItemFromCart: () => {},
    removeItemFromCart: () => {}
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    // Resetting cartCount every time "cartItems" changes;
    useEffect(() => {
        const newCartCount = cartItems.reduce((preVal, curVal) => preVal + curVal.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (productToDelete) => {
        setCartItems(clearCartItem(cartItems, productToDelete));
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart,
        removeItemFromCart, 
        cartItems, 
        cartCount, 
        clearItemFromCart 
    };

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