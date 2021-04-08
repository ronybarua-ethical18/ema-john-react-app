import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SplitForm from './SplitForm';
import CheckOutForm from './CheckOutForm';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51IeDxzBLM5KmxZWzBveLK2US0Qr9L2rGeQZcfUYL5bse8ElXJ8vab3qKMrCjxHFuAyK3DFnJwYBwdRXvE5LUniOU00Tt3IfC4T');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckOutForm handlePayment={handlePayment}></CheckOutForm>
        </Elements>
    );
};

export default ProcessPayment;