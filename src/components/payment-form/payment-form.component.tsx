import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { selectCurrentUser } from "../../store/user/user.selector";
import { emptyItemsFromCart } from "../../store/cart/cart.action";
import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { StripeCardElement } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import { useSelector  } from "react-redux";
import { useDispatch } from "react-redux";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;
const PaymentForm = () => {
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    try {
      const response =  await fetch("/.netlify/functions/create-payment-intent", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: amount*100 })
      }).then(res => res.json());
  
      const { paymentIntent: { client_secret }} = response;
  
      const cardDetails = elements.getElement(CardElement);
      
      if (!ifValidCardElement(cardDetails)) return;

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardDetails,
          billing_details: {
            name: currentUser ? currentUser.displayName : "Guest"
          }
        }
      });
  
      setIsProcessingPayment(false);
      if ( paymentResult.error) alert(paymentResult.error);
      else {
        if ((paymentResult).paymentIntent.status === "succeeded") {
          dispatch(emptyItemsFromCart());
          setPaymentProcessed(true);
        };
      };
    }
    catch(error) {
      alert("Please enter the right credit card information");
    }
  
  };


  return (
    <PaymentFormContainer>
      {paymentProcessed ? (
        <>
          <h1>Payment Successful</h1>
          <h2>Thanks for shopping with us!</h2>
        </>
      ) : (
        <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</PaymentButton>
      </FormContainer>
      )}
    </PaymentFormContainer>
  );
};

export default PaymentForm;