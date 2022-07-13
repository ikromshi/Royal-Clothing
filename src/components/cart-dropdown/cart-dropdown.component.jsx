// import { useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
// import { CartContext } from "../../contexts/cart.context";
import { selectCartItems } from "../../store/cart/cart.selector";
import {CartDropdownContainer, EmptyMessage, CartItems} from  "./cart-dropdown.styles.jsx";

const CartDropdown = () => {
    // const { cartItems } = useContext(CartContext);
    const cartItems = useSelector(selectCartItems);

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