import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CheckOut = () => {
    const { cartItems, addItemToCart, removeItemFromCart } = useContext(CartContext);

    return (
        <div>
            {cartItems.map((cartItem) => {
                const { id, name, quantity, price, imageUrl } = cartItem;
                return (
                    <div key={id}>
                        {/* <img src={imageUrl} alt={name} /> */}
                        <h2>{name}</h2>
                        <h2>{quantity}</h2>
                        <span onClick={() => {removeItemFromCart(cartItem)}}>decrement</span><br />
                        <span onClick={() => {addItemToCart(cartItem)}}>increment</span><br />
                        <span>${price * quantity}</span>
                        <br />
                    </div>
            )})}
        </div>
    );
};

export default CheckOut;