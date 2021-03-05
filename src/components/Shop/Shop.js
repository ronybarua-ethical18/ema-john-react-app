import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from "react-router-dom";
const Shop = () => {
   const first10 = fakeData.slice(0, 10);
   const [products, setProducts] = useState(first10);
   const [cart, setCart] = useState([]);

   useEffect(() => {
     const savedCart = getDatabaseCart();
     const productKeys = Object.keys(savedCart);
     const previousData = productKeys.map(existingKey => {
       const product = fakeData.find(pdKey => pdKey.key === existingKey);
       product.quantity = savedCart[existingKey];
      return product;
     });
      setCart(previousData);
   }, [])
   const handleAddProduct = (product) =>{
     const toBeAdded = product.key;
    const sameData = cart.find(pd => pd.key === toBeAdded);
    let count = 1;
    let newCart;
    if(sameData){
      count  = sameData.quantity + 1;
      sameData.quantity = count;

      const others = cart.filter(pd => pd.key !== toBeAdded);
      newCart = [...others, sameData];
    }
    else{
        product.quantity = 1;
        newCart = [...cart, product]
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count)
   }
    return (
        <div className="similar-container">
          <div className="product-container">
            {
                products.map(pd => <Product key={pd.key} showAddToCart={true} handleAddProduct= {handleAddProduct} product={pd}></Product>)
            }
          </div>
          <div className="cart-container">
               <Cart cart={cart}>
               <Link to="/review"> <button className="review-button">Review your order</button></Link>
               </Cart>
          </div>
        </div>
    );
};

export default Shop;