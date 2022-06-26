import { CartItemContainer, ItemDetails } from "./cart-item.styles.jsx";

const CartItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
     
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={name} />
            <ItemDetails>
                <span>{name}</span>
                <span className="price">{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
}

export default CartItem;