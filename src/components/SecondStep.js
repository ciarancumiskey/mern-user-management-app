import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const SecondStep = (props) => {
    const { user } = props;
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            /*  If the user has navigated back to this step, this will pre-populate
                the form with what they've already entered */
            user_email: user.user_email, user_password: user.user_password
        }
    });
    const onSubmit = (data) => {
        console.log(data);
        //TODO: Implement the final stage
        props.updateUser(data);
        props.history.push('/third');
    };
    return (
        <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>Please enter your email address and new password:</h2>
            </div>
            <motion.div className="col-md-6 offset-md-3"
                initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }}>
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
            </motion.div>
        </Form>
    );
};

export default SecondStep;