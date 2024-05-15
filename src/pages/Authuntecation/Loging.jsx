import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import { ErrorMessage, Field, Form, Formik,validateYupSchema } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { loginUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const initialValues={username:"",password:""};
// const validationSchema={username:Yup.string().username("Invalid username or email").required("username or Email is required ")
//     ,password:Yup.string().min(6,"Password must be at least 6 characters").required("Password is required"),
// };

const validationSchema = {
    username: Yup.string().required("Username or Email is required").test(
        'is-email',
        'Invalid username or email',
        function(value) {
            // Check if the value is in the format of an email address
            if (Yup.string().email().isValidSync(value)) {
                return true; // Value is a valid email address
            } else {
                // Treat the value as a username
                return /^[a-zA-Z0-9_.-]*$/.test(value); // Return true if the value is alphanumeric
            }
        }
    ),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
};


const Login=()=>{
    const[formValue,setFormValue]=useState();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleSubmit=(values)=>{
        console.log("handle submit",values);
        dispatch(loginUserAction({data:values}))
    };
    return(
        <>

        <Formik
         onSubmit={handleSubmit}
        //  validationSchema={validationSchema}
           initialValues={initialValues}>

            <Form className='space-y-5'>
                <div className='space-y-5'>
                    <div>
                    <Field as ={TextField} name="username" label="Username or Email" type='text' variant="outlined" fullWidth/>

                        <ErrorMessage name='username' component={"div"} className='text-red-500'/>
                    </div>

                    <div>
                    <Field as ={TextField} name="password" label="Password" type='password' variant="outlined"  fullWidth />

                        {/* <TextField  name="password" placeholder="password" type="password" variant="oulined" fullWidth/> */}

                        <ErrorMessage name='password' component="div" className='text-red-500'/>
                    </div>

                    </div> 
                    <Button
                     sx={{padding:".8rem 0rem"}}
                     fullWidth
                     type='submit'
                     variant='contained' 
                    color='primary'>LOGIN</Button>
            </Form>

        </Formik>
        <div className='flex justify-center gap-2 items-center'>
            <p>if you don`t have account ?</p>
            <Button onClick={()=>navigate("/register")} sx={{ textTransform: 'none' }}>Register</Button>
        </div>


        </>
    )
}

export default Login