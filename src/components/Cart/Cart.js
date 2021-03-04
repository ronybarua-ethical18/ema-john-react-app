import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
const Cart = (props) => {
  const cart = props.cart;
  // const total = cart.reduce((total, prd) => total + prd.price, 0);
  
  // alternative of above code
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    console.log(product);
    total = total + product.price;
  }
  let shipping = 0;
  if (total > 35) {
    shipping = 0;
  } else if (total > 15) {
    shipping = 4.99;
  } else if (total > 0) {
    shipping = 12.99;
  }

  let tax = Math.round(total / 10);
  let totalCost = total + shipping + tax;
  const grandTotal = totalCost.toFixed(2);
  return (
    <div className="cart-details">
      <div className="order-details">
        <h2>Order Summary</h2>
        <p>Items Ordered: {cart.length}</p>
      </div>
      <p>Product costs: ${total}</p>
      <p>Shipping Cost: ${shipping}</p>
      <p>Tax + Vat: ${tax}</p>
      <h3>Total Price: ${grandTotal}</h3>
     <Link to="/review"> <button className="review-button">Review your order</button></Link>
    </div>
  );
};

export default Cart;
