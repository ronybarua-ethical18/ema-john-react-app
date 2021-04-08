import React from "react";
import "./Cart.css";
const Cart = (props) => {
  const cart = props.cart;
  // const total = cart.reduce((total, prd) => total + prd.price, 0);

  // alternative of above code
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total = total + product.price * product.quantity || 1;
    console.log(cart.length);
  }
  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12.99;
  }


  const tax = (total / 10).toFixed(2);
  const grandTotal = (total + shipping + Number(tax)).toFixed(2);

  const formatNumber = num => {
    const precision = num.toFixed(2);
    return Number(precision);
  }
  return (
    <div className="cart-details">
      <div className="order-details">
        <h4 className="display-5">Order Summary</h4>
        <p>Items Ordered: {cart.length}</p>
      </div>
      <p>Product costs: {formatNumber(total)}</p>
      <p>Shipping Cost: ${shipping}</p>
      <p>Tax + Vat: ${tax}</p>
      <h5 className="display-6">Total Price: ${grandTotal}</h5>
      {
        props.children
      }
    </div>
  );
};

export default Cart;
