import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import {CartDropdownContainer, EmptyMessage, CartItems} from  "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (cartItems.map(item => <CartItem key={item.id} cartItem={item}></CartItem>))
                : (<EmptyMessage>Your cart is empty</EmptyMessage>)}
            </CartItems>
            <Link to="/checkout"><Button>GO TO CHECKOUT</Button></Link>
        </CartDropdownContainer>
    )
}

export default CartDropdown;