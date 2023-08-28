import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckOutForm";
import "../Stripe.css";
import { useSelector } from "react-redux";
import { selectCurrentOrder } from "../features/Auth/Components/Order/OrderSlice";
const stripePromise = loadStripe(
  "pk_test_51NTRFaSDDH69powQtPoeZ1taY15EXvDWQP2PiGrt3EeM39aDdwET2fRk1w1TY8qwhGQOE8yHjWTIJpc11Mk6GNeK00HYZ0J4Zi"
);

export default function StripeCheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);
  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalAmount: currentOrder.totalAmount }),
      meta: {
        order_id: currentOrder.id,
      },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe flex items-center justify-center py-32">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
