import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { BASE_API_URL } from '../utils/constants';

const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [userDetails, setUserDetails] = useState('');

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(`${BASE_API_URL}/login`, data);
            setSuccessMsg("Login successful.");
            setErrorMsg('');
            setUserDetails(response.data);
        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log('Error:', error.response.data);
                setErrorMsg(error.response.data);
            }
        }
    };
    return (
        <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-6 offset-md-3">
                {errorMsg ? (
                    <p className="errorMsg login-error">{errorMsg}</p>
                ) : (
                        <div>
                            <p className="successMsg">{successMsg}</p>
                            {userDetails && (
                                <div className="user-details">
                                    <p>User details for {userDetails.user_email}:</p>
                                    <div>Name: {userDetails.first_name} {userDetails.surname}</div>
                                    <div>Location: {userDetails.city}, {userDetails.state}, {userDetails.country}</div>
                                </div>
                            )}
                        </div>
                    )}
                <Form.Group controlId="first_name">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="user_email"
                        placeholder="Enter your email address"
                        ref={register({
                            required: 'Please enter your email address.',
                            pattern: {
                                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                message: 'Please enter a valid email address.'
                            }
                        })}
                        className={`${errors.user_email ? 'input-error' : ''}`}
                    />
                    {errors.user_email && (
                        <p className="errorMsg">{errors.user_email.message}</p>
                    )}
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="user_password"
                        placeholder="Please enter your password."
                        ref={register({
                            required: 'Password is required.',
                            minLength: {
                                value: 6,
                                message: 'Please enter a password with at least 6 characters.'
                            }
                        })}
                        className={`${errors.user_password ? 'input-error' : ''}`}
                    />
                    {errors.user_password && (
                        <p className="errorMsg">{errors.user_password.message}</p>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
            </div>
        </Form>
    );
};

export default Login;
                    
                                    