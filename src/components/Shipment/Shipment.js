import React, { useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'
const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); // watch input value by passing the name of it
  
    return (
     <Container>
         <Row>
              <form onSubmit={handleSubmit(onSubmit)} className="border">
        
                <input name="name"  defaultValue={loggedInUser.name} ref={register({ required: true })} />
                {errors.name && <span>Name is required</span>}
                
                <input name="email"  defaultValue={loggedInUser.email} ref={register({ required: true })} />
                {errors.email && <span>Email is required</span>}
                
                <input name="address" ref={register({ required: true })} />
                {errors.address && <span>Address is required</span>}
                
                <input name="phone" ref={register({ required: true })} />
                {errors.phone && <span>Phone is required</span>}
                
                <input type="submit" />
              </form>
         </Row>
     </Container>
    );
};

export default Shipment;