import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const FirstStep = (props) => {
    const { user } = props;
    /**
     * register will be used as a ref by the useForm() hook, and is assigned 
     * to each input field so it can track changes in those.
     * handleSubmit, like its name suggests, is called when the form is submitted.
     * errors is for errors.    
     */
    const { register, handleSubmit, errors } = useForm({
        /*  If the user has navigated back to this step, this will pre-populate 
            the form with what they've already entered */
        defaultValues: {
            first_name: user.first_name, surname: user.surname
        }
    });

    const onSubmit = (data) => {
        //TODO: Set up database
        console.log(data);
        //Automatically navigate to the next stage of the form
        props.updateUser(data);
        props.history.push('/second');
    };
    return (
        <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <h2>Please enter your name:</h2>
            </div>
            <motion.div className="col-md-6 offset-md-3"
                initial={{ x: '-100vw' }} animate={{ x: 0 }} transition={{ stiffness: 150 }}>
                <Form.Group controlId="first_name">
                    <Form.Label>First Name(s)</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        placeholder="Enter your first name(s)"
                        autoComplete="off"
                        ref={register({
                            required: 'First name is required.',
                            pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: 'First name should contain only characters. If your parents decided to emulate Elon and Grimes, sorry.'
                            }
                        })}
                        className={`${errors.first_name ? 'input-error' : ''}`}
                    />
                    {errors.first_name && (<p className="errorMsg">{errors.first_name.message}</p>)}
                </Form.Group>
                <Form.Group controlId="surname">
                    <Form.Label>Surname(s)</Form.Label>
                    <Form.Control
                        type="text"
                        name="surname"
                        placeholder="Enter your surname"
                        autoComplete="off"
                        ref={register({
                            required: 'Surname is required.',
                            pattern: {
                                value: /^[a-zA-Z]+$/,
                                message: 'Surname should contain only characters.'
                            }
                        })}
                        className={`${errors.surname ? 'input-error' : ''}`}
                    />
                    {errors.surname && (<p className="errorMsg">{errors.surname.message}</p>)}
                </Form.Group>
                <Button variant="primary" type="submit">
                    Next
                </Button>
            </motion.div>
        </Form>
    );
};

export default FirstStep;