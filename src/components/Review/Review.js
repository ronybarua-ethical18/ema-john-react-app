import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import HappyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();
    
    const handleProceedOrder = () =>{
        history.push('/shipment');
    }
    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    
    useEffect(()=> {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        fetch('https://frozen-harbor-33735.herokuapp.com/productsByKeys', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
        // const cartProduct = productKeys.map(key => {
        //     const product = fakeData.find(pd => pd.key === key);
        //     product.quantity = savedCart[key];
        //     return product;
        // });
        // setCart(cartProduct);
    }, [])
    let thankYou;
    if(orderPlaced){
        thankYou = <img src={HappyImage} alt=""/>
    }
    return (
        <div className="similar-container">
            <div className="product-container">
                { 
                    cart.map(pd => <ReviewItem key ={pd.key}
                        removeProduct={removeProduct}
                        product ={pd}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedOrder} className="review-button">Proceed Order</button>
                </Cart>    
            </div>
        </div>
    );
};

export default Review;