import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'
const Shipment = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [shippingData, setShippingData] = useState(null)
  const { register, handleSubmit, watch, errors } = useForm();
  const savedCart = getDatabaseCart();

  const onSubmit = data => {
    setShippingData(data)
  };

  const handlePaymentSuccess = paymentId => {
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: shippingData,
      orderTime: new Date(),
      paymentId
    };
    console.log(orderDetails);
    fetch('https://frozen-harbor-33735.herokuapp.com/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderDetails)
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          processOrder();
          alert('your order placed Successfully')
        }
      })
  }

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <Container>
      <Row>
        <Col md={6}>
          <form style={{display: shippingData ? 'none' : 'block'}} className="ship-form" onSubmit={handleSubmit(onSubmit)}>
            <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your Name" />
            {errors.name && <span className="error">Name is required</span>}

            <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your Email" />
            {errors.email && <span className="error">Email is required</span>}

            <input name="address" ref={register({ required: true })} placeholder="Your Address" />
            {errors.address && <span className="error">Address is required</span>}

            <input name="phone" ref={register({ required: true })} placeholder="Your Phone Number" />
            {errors.phone && <span className="error">Phone Number is required</span>}

            <button>Submit</button>
          </form>
        </Col>
        <Col md={6} className="border bg-light" style={{display: shippingData ? 'block' : 'none'}}>
          <h2>Please pay for shipment</h2>
          <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
        </Col>
      </Row>
    </Container>
  );
};

export default Shipment;