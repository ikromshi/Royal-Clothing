import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from "./checkout.styles.jsx";
import PaymentForm from "../../components/payment-form/payment-form.component";
import { selectCartTotal, selectCartItems } from "../../store/cart/cart.selector";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { useSelector } from "react-redux";
// import { useContext } from "react";
// import { CartContext } from "../../contexts/cart.context";

const CheckOut = () => {
    // const { cartItems, cartTotal } = useContext(CartContext);

    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Decription</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
            {cartItems.map((cartItem) => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
            <Total className="total">Total: ${cartTotal}</Total>
            <PaymentForm />

        </CheckoutContainer>
    ); 
};

export default CheckOut;