import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';
import { loginUser } from '../_actions/user_action';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Checkbox, Button } from '@material-ui/core';
import './Register.css';


function Login(props) {

    const dispatch = useDispatch();

    const rememberMeChecked = localStorage.getItem('rememberMe') ? true : false;

    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    };

    const initialEmail = localStorage.getItem('rememberMe') ? localStorage.getItem('rememberMe') : '';

    return (
        <Formik
            initialValues={{
                email: initialEmail,
                password: '',
            }}
            validationSchema={yup.object().shape({
                email: yup.string()
                    .email('Email is invalid!')
                    .required('Email is Required!'),
                password: yup.string()
                    .required('Password is required!'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    let submit = {
                        email: values.email,
                        password: values.password,
                    }
                    dispatch(loginUser(submit))
                        .then(response => {
                            if (response.payload.loginSuccess) {
                                window.localStorage.setItem('userId', response.payload.userId);
                                if (rememberMe === true) {
                                    window.localStorage.setItem('rememberMe', values.id);
                                } else {
                                    localStorage.removeItem('rememberMe');
                                }
                                props.history.push('/');
                            } else {
                                setError('Invalid Username or Password!');
                            }
                        })
                        .catch(err => {
                            setError('Invalid Username or Password again');
                            setTimeout(() => {
                                setError('')
                            }, 3000)
                        })
                    setSubmitting(false);
                }, 500)
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
                    <div>
                        <div className='login__block'>
                            <h2>SignIn</h2>

                            <form onSubmit={handleSubmit}>
                                <center>
                                    <div className='login__fields'>
                                        <TextField id='login__field'
                                            name='email'
                                            label='Email'
                                            variant='outlined'
                                            type='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            required
                                            className={
                                                errors.email && touched.email ? 'text-input error' : 'text-input'
                                            } >
                                            {errors.email && touched.email && (
                                                <div className='input-feedback'>{errors.email}</div>
                                            )}
                                        </TextField>

                                        <TextField id='login__field'
                                            name='password'
                                            label='Password'
                                            variant='outlined'
                                            type='password'
                                            value={values.password}
                                            onChange={handleChange}
                                            required
                                            className={
                                                errors.password && touched.password ? 'text-input error' : 'text-input'
                                            }
                                        >
                                            {errors.password && touched.password && (
                                                <div className='input-feedback'>{errors.password}</div>
                                            )}
                                        </TextField>
                                    </div>

                                    {error && (
                                        <label><p className='login__error'>{error}</p></label>
                                    )}

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={rememberMe}
                                                onChange={handleRememberMe}
                                                color="primary"
                                            />
                                        }
                                        label="Remember Me"
                                    />

                                    <div className='login__btns'>
                                        <Button className='login__btn' variant='contained' type='submit' disabled={isSubmitting} onClick={handleSubmit}>Login</Button>
                                    </div>
                                    <div className='login__links'>
                                        <a href='#'>Forgot Password?</a>
                                        <Link to='/register'>
                                            <a href='/register'>Not Registered? Sign Up</a>
                                        </Link>
                                    </div>
                                </center>
                            </form>
                        </div>
                    </div>

                )
            }}
        </Formik>
    )
}

export default withRouter(Login);