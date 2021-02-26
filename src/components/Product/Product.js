import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "./Product.css";
const Product = (props) => {
    console.log(props);
  const { img, name, seller, price, stock } = props.product;
  return (
    <div className="product">
      <div className="product-image">
        <img src={img} alt="" />
      </div>
      <div>
        <h4 className="product-name">{name}</h4>
        <p>
          <small>{seller}</small>
        </p>
        <p>${price}</p>
        <p>
          <small>Only {stock} left in the stock- Order soon</small>
        </p>
        <button className="cart-button"
        onClick={() => {props.handleAddProduct(props.product)}}
        >
        <FontAwesomeIcon icon={faShoppingCart} />add to cart</button>
      </div>
    </div>
  );
};

export default Product;
