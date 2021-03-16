import { faFacebook, faGithub, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faLock, faSignature } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Login.css';
import SignIn from './sign-in.png';
import avatar from './avatar.png';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFacebookSignIn, handleGithubSignIn, handleGoogleSignIn, initializeFirebase, signInWithEmailAndPassword } from './LoginManager';

const Login = () => {
    initializeFirebase();
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        error: '',
        password: '',
        success: false
    });
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [newUser, setNewUser] = useState(false);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleResponse = (res, redirect) =>{
        setUser(res);
        setLoggedInUser(res);
        redirect && history.replace(from);
    }
    const facebookSignIn = () =>{
        handleFacebookSignIn()
        .then(res => {
           handleResponse(res, true);
        })
    }
    const googleSignIn = () =>{
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }
    const githubSignIn = () =>{
        handleGithubSignIn()
        .then(res =>{
            handleResponse(res, true);
        })
    }

    const handleBlur = (event) => {
        let isFormValid = true;
        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
            console.log(isFormValid);
        }
        if (event.target.name === 'password') {
            const passwordLength = event.target.value.length > 6;
            const hasNumber = /\d{1}/.test(event.target.value);
            isFormValid = passwordLength && hasNumber;
            console.log(isFormValid);
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                   handleResponse(res, true);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        event.preventDefault();
    }
    return (
        <div className="authentic-field">
            <Container className="h-100">
                <Row className="m-3 shadow">
                    <Col md={7} sm={12} xs={12} className="mx-auto p-5" >
                        <h4 className="display-5">User Information</h4>
                        <img src={SignIn} className="img-fluid" alt="" />
                        <p className="text-left">Firebase Authentication provides backend services, easy-to-use SDKs, and ready-made UI libraries to authenticate users to your app. It supports authentication using passwords, phone numbers, popular federated identity providers like Google, Facebook and Twitter, and more.</p>
                    </Col>
                    <Col md={5} sm={12} xs={12} className="p-4 text-center shadow">
                        <img src={avatar} className="img-fluid rounded avatar mb-2" alt="" />
                        <h4 className="display-6">User Authentication</h4>
                        <p style={{ color: 'red' }}>{user.error}</p>
                        {user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>}
                        <form action="" onSubmit={handleSubmit} className="mt-4">
                            {newUser && <div className="input-field mb-3">
                                <FontAwesomeIcon icon={faSignature} className="icons"></FontAwesomeIcon>
                                <input onBlur={handleBlur} type="text" name="name" placeholder="name" required />
                            </div>}
                            <div className="input-field mb-3">
                                <FontAwesomeIcon className="icons" icon={faUser}></FontAwesomeIcon>
                                <input onBlur={handleBlur} type="text" name="email" placeholder="Enter your email" />
                            </div>
                            <div className="input-field mb-3">
                                <FontAwesomeIcon className="icons" icon={faLock}></FontAwesomeIcon>
                                <input onBlur={handleBlur} type="password" name="password" placeholder="Enter password" id="" />
                            </div>
                            <div className="checkbox mb-2">
                                <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
                                <label htmlFor="newUser" className="ml-2">Sign up if you are new here </label>
                            </div>
                            <button type="submit" className="submit-button mb-2">{newUser ? 'Sign Up' : 'Sign In'}</button>
                            <p>Sign in with social platforms</p>
                            <div className="social-icons d-flex w-100 justify-content-center  ">
                                <FontAwesomeIcon onClick={facebookSignIn} icon={faFacebook} className="social-icon mr-3"></FontAwesomeIcon>
                                <FontAwesomeIcon onClick={googleSignIn} icon={faGoogle} className="social-icon mr-3"></FontAwesomeIcon>
                                <FontAwesomeIcon onClick={githubSignIn} icon={faGithub} className="social-icon mr-3"></FontAwesomeIcon>
                                <FontAwesomeIcon icon={faTwitter} className="social-icon"></FontAwesomeIcon>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;