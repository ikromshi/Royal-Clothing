import { CartItemContainer, ItemDetails } from "./cart-item.styles";
import { CartItem as TCartItem } from '../../store/cart/cart.types';
import { FC } from "react";

type CartItemProps = {
    cartItem: TCartItem;
  };

const CartItem: FC<CartItemProps> = ({ cartItem }) => {
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