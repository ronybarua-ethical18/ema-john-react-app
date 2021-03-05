import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, img, price, key} = props.product;
    const itemStyling = {
        borderBottom: '1px solid lightgray',
        padding:'20px',
        margin:'20px'
    }
    const nameStyling = {
        marginTop: '20px'
    }
    return (
        <div style={itemStyling}>
            <img src={img} alt=""/>
            <p className="product-name">{name}</p>
            <b >Quantity: {quantity}</b><br></br>
            <p>Product Price: {price}</p>
            <button style={nameStyling} 
            onClick = {() => props.removeProduct(key)}
            className="cart-button">Remove Item</button>
        </div>
    );
};

export default ReviewItem;