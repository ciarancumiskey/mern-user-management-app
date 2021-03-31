import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

const SecondStep = (props) => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => {
        console.log(data);
        //TODO: Implement the final stage
        props.history.push('/third');
    };
    return (
        <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>Please enter your email address and new password:</h2>
            </div>
            <div className="col-md-6 offset-md-3">
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="user_email"
                        placeholder="Enter your email address"
                        autoComplete="off"
                        ref={register({
                            required: 'Email is required.',
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
                        placeholder="Choose a password"
                        autoComplete="off"
                        ref={register({
                            required: 'Password is required.',
                            minLength: {
                                value: 6,
                                message: 'Please enter a password of at least 6 characters.'
                            }
                        })}
                        className={`${errors.user_password ? 'input-error' : ''}`}
                    />
                    {errors.user_password && (
                        <p className="errorMsg">{errors.user_password.message}</p>
                    )}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Next
                </Button>
            </div>
        </Form>
    );
};

export default SecondStep;