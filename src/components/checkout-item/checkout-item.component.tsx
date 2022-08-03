// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";
import { clearItemFromCart, addItemToCart, removeItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CheckoutItemContainer,
        ImageContainer,
        BaseSpan, 
        Quantity,
        Arrow,
        Value,
        RemoveButton,
} from "./checkout-item.styles";
import { CartItem } from "../../store/cart/cart.types";
import { FC } from "react";

type CheckoutItemProps = {
    cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
    // const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);
    const { name, imageUrl, price, quantity  } = cartItem;
    
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={name} />
            </ImageContainer>
            <BaseSpan as="span">{name}</BaseSpan>
            <Quantity as="span">
                <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
                <Value as="span">{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan as="span">{`$${price}`}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>

    )
}

export default CheckoutItem;