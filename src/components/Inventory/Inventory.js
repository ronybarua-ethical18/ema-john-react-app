import React from 'react';
import './inventory.css'
const Inventory = () => {
    const handleAddProduct = () =>{
        const products = {};
        fetch('https://frozen-harbor-33735.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(products)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name:</span><input type="text"/></p>
                <p><span>Price</span><input type="text"/></p>
                <p><span>ProductImage:</span><input type="file"/></p>
                <p><span></span><input type="text"/></p>
                <button onClick={handleAddProduct}>Add Product</button>
            </form>
            
        </div>
    );
};

export default Inventory;