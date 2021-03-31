import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';

const FirstStep = (props) => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
                Name
            </div>
            <div className="col-md-6 offset-md-3">
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
            </div>
        </Form>
    );
};

export default FirstStep;