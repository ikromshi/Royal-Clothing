import { CartItemContainer, ItemDetails } from "./cart-item.styles.jsx";
import { CartItem } from "../../store/cart/cart.types.js";

type CartItemProps = {
    cartItem: {
        name: string;
        imageUrl: string;
        price: number;
        quantity: number;
    }
};

const CartItem = ({cartItem}: CartItemProps) => {
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