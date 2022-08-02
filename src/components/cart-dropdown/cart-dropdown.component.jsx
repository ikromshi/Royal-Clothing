import {CartDropdownContainer, EmptyMessage, CartItems} from  "./cart-dropdown.styles.jsx";
import { selectCartItems, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action.ts";
import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CartDropdown = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    const isCartOpen = useSelector(selectIsCartOpen);

    const openCart = () => dispatch(setIsCartOpen(true));
    const closeCart = () => dispatch(setIsCartOpen(false));
    
    return (
        <CartDropdownContainer 
        onMouseEnter={openCart}
        onMouseLeave={closeCart}
        >
            <CartItems>
                {cartItems.length ? (cartItems.map(item => <CartItem key={item.id} cartItem={item}></CartItem>))
                : (<EmptyMessage>Your cart is empty</EmptyMessage>)}
            </CartItems>
            <Link to="/checkout"><Button>GO TO CHECKOUT</Button></Link>
        </CartDropdownContainer>
    )
}

export default CartDropdown;