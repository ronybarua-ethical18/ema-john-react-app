import React, { useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link } from "react-router-dom";
const Shop = () => {
  //  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`http://localhost:4000/products?search=`+search)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [search])

  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);

    fetch('https://frozen-harbor-33735.herokuapp.com/productsByKeys', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productKeys)
    })
      .then(res => res.json())
      .then(data => setCart(data))
    // if(products.length > 0){
    //   const previousData = productKeys.map(existingKey => {
    //     const product = products.find(pdKey => pdKey.key === existingKey);
    //     product.quantity = savedCart[existingKey];
    //    return product;
    //   });
    //    setCart(previousData);
    // }
  }, [])

  const handleSearch = event => {
    setSearch(event.target.value);
  }

  const handleAddProduct = (product) => {
    const toBeAdded = product.key;
    const sameData = cart.find(pd => pd.key === toBeAdded);
    let count = 1;
    let newCart;
    if (sameData) {
      count = sameData.quantity + 1;
      sameData.quantity = count;

      const others = cart.filter(pd => pd.key !== toBeAdded);
      newCart = [...others, sameData];
    }
    else {
      product.quantity = 1;
      newCart = [...cart, product]
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count)
  }
  return (
    <div className="similar-container">
      <div className="product-container">
        <div className="search-product text-center">
          <input type="text" placeholder="Search Product" onBlur={handleSearch} />
        </div>
        {
          products.map(pd => <Product key={pd.key} showAddToCart={true} handleAddProduct={handleAddProduct} product={pd}></Product>)
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