import React, { useState} from 'react'
import { Formik } from 'formik';
import axios from 'axios'
import './login.css'

export const Login = () => {

    const [ userData, setUserData ] = useState()
    const apiPort = 'https://api.escuelademusicabarrial.ar'

    const sendDataUser = async (payload) => {
        await axios.post('http://localhost:8080/auth/login', payload)
        .then(res=>{
            const token = res.data.data.token
            sessionStorage.setItem('tkn', token)
        })
        .then(()=>{
            window.location.href = '/admin/dashboard'
        })
        .catch(() => {
            alert('error')
            console.log('error')
        })
    }
    
    return(
        <div className='login-view'>
            <h2>Login</h2>
            <Formik className='login-form'
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                errors.email = 'Required';
                } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                
                setUserData({email:values.email, pass:values.password})
                sendDataUser(values)
                setSubmitting(false);
                }, 400);
            }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
            }) => (
                <form className='login-form' onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder='correo electrónico'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
                {errors.email && touched.email && errors.email}
                <input
                    type="password"
                    name="password"
                    placeholder='contraseña'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <button type="submit" disabled={isSubmitting}>
                    Ingresar
                </button>
                </form>
            )}
            </Formik>
        </div>
    )
}
