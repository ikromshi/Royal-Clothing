import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map(item => <CartItem key={item.id} cartItem={item}></CartItem>)}
            </div>
            <Link to="/checkout"><Button>GO TO CHECKOUT</Button></Link>
        </div>
    )
}

export default CartDropdown;