import { ShoppingIcon, CartIconContainer, ItemCount  } from  "./cart-icon.styles";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";

const CartIcon = () => {
    const dispatch = useDispatch();
    
    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer 
        onClick={toggleIsCartOpen} 
        onMouseEnter={toggleIsCartOpen}
        >
            <ShoppingIcon className="shopping-icon" />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;