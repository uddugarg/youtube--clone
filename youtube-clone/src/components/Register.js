import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { registerUser } from '../_actions/user_action';
import { TextField, Button } from '@material-ui/core';
import './Register.css';



function Register(props) {

    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                confirmPassword: '',
                lastName: '',
                name: '',
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('Name is required'),
                lastName: Yup.string()
                    .required('Last Name is required'),
                email: Yup.string()
                    .email('Email is Invalid')
                    .required('Email is required'),
                password: Yup.string()
                    .min(8, 'Password must be at least 8 characters')
                    .required('Name is required'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Password must match')
                    .required('Name is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let submit = {
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        lastName: values.lastName,
                        image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
                    }

                    dispatch(registerUser(submit)).then(response => {
                        if (response.payload.success) {
                            props.history.push('/login');
                        } else {
                            alert(response.payload.err.errmsg)
                        }
                    })
                    setSubmitting(false);
                }, 500);
            }}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    dirty,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    handleReset,
                } = props;

                return (
                    <div className='register__block'>
                        <h2>Register</h2>

                        <form onSubmit={handleSubmit} >
                            <center>
                                <div className='register__fields'>
                                    <TextField id='register_field'
                                        name='name'
                                        label='Full Name'
                                        variant='outlined'
                                        type='text'
                                        values={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        className={
                                            errors.name && touched.name ? 'text-input error' : 'text-input'
                                        }
                                    >
                                        {errors.name && touched.name && (
                                            <div className='input-feedback'>{errors.name}</div>
                                        )}
                                    </TextField>

                                    <TextField id='register_field'
                                        name='lastName'
                                        label='Last Name'
                                        variant='outlined'
                                        type='text'
                                        values={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        className={
                                            errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                                        }
                                    >
                                        {errors.lastName && touched.lastName && (
                                            <div className='input-feedback'>{errors.lastName}</div>
                                        )}
                                    </TextField>

                                    <TextField id='register_field'
                                        name='email'
                                        label='Email'
                                        variant='outlined'
                                        type='email'
                                        values={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        className={
                                            errors.email && touched.email ? 'text-input error' : 'text-input'
                                        }
                                        hasFeedback
                                        validateStatus={
                                            errors.email && touched.email ? 'error' : 'success'
                                        }
                                    >
                                        {errors.email && touched.email && (
                                            <div className='input-feedback'>{errors.email}</div>
                                        )}
                                    </TextField>

                                    <TextField id='register_field'
                                        name='password'
                                        label='Password'
                                        variant='outlined'
                                        type='password'
                                        values={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        className={
                                            errors.password && touched.password ? 'text-input error' : 'text-input'
                                        }
                                        hasFeedback
                                        validateStatus={
                                            errors.password && touched.password ? 'error' : 'success'
                                        }
                                    >
                                        {errors.password && touched.password && (
                                            <div className='input-feedback'>{errors.password}</div>
                                        )}
                                    </TextField>

                                    <TextField id='register_field'
                                        name='confirmPassword'
                                        label='Confirm Password'
                                        variant='outlined'
                                        type='password'
                                        values={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        className={
                                            errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                                        }
                                    >
                                        {errors.confirmPassword && touched.confirmPassword && (
                                            <div className='input-feedback'>{errors.confirmPassword}</div>
                                        )}
                                    </TextField>
                                </div>

                                <div className='register__btns'>
                                    <Button onClick={handleSubmit} variant='contained' type='submit' disabled={isSubmitting}>Sign Up</Button>
                                </div>
                            </center>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
}

export default Register;
