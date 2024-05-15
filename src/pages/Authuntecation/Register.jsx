import React, { useState } from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { registerUserAction } from '../../Redux/Auth/auth.action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';




// const initialValues={firstName:"",lastName:"",  email:"", password:"",gender:""};
const initialValues={username:"",  email:"",firstName:"",lastName:"", password:""};
const validationSchema={
    email:Yup.string().email("Invalid email").required("Email is required ")
    ,password:Yup.string()
    .min(6,"Password must be at least 6 characters")
    .required("Password is required"),
};

const Register=()=>{
    // const[gender,setGender]=useState("");
    const dispatch =useDispatch();
    const navigate=useNavigate();

    const handleSubmit=(values)=>{
        // values.gender=gender;
        console.log("handle submit",values);

        
        dispatch(registerUserAction({data:values}))
    };

    // const handlechange=(event)=>{
    //     setGender(event.target.value);
    // }

    return(
        <>

        <Formik
         onSubmit={handleSubmit}
        //   validationSchema={validationSchema}
           initialValues={initialValues}
           >

            <Form className='space-y-5'>
                <div className='space-y-5'>
                <div>
                    <Field as ={TextField} name="username" placeholder="User Name" type='text' variant="outlined" fullWidth/>

                        <ErrorMessage name='username' component={"div"} className='text-red-500'/>
                    </div>
                  
                    <div>
                    <Field as ={TextField} name="email" placeholder="Email" type='email' variant="outlined" fullWidth/>

                        <ErrorMessage name='email' component={"div"} className='text-red-500'/>
                    </div>

                    <div>
                    <Field as ={TextField} name="firstName" placeholder="First Name" type='text' variant="outlined" fullWidth/>

                        <ErrorMessage name='firstName' component={"div"} className='text-red-500'/>
                    </div>

                    <div>
                    <Field as ={TextField} name="lastName" placeholder="Last Name" type='text' variant="outlined" fullWidth/>

                        <ErrorMessage name='lastName' component={"div"} className='text-red-500'/>
                    </div>

                    <div>

                    
                    <Field as ={TextField} name="password" placeholder="Password" type='password' variant="outlined"  fullWidth />

                      
                        <ErrorMessage name='password' component="div" className='text-red-500'/>
                    </div>
                    {/* <RadioGroup onChange={handlechange}
        row
        aria-label="gender"
        name="gender"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <ErrorMessage name='gender' component={"div"} className='text-red-500'/>
                 
      </RadioGroup> */}

                    </div> 
                    <Button
                     sx={{padding:".8rem 0rem"}}
                     fullWidth
                     type='submit'
                     variant='contained' 
                    color='primary'>Register</Button>
            </Form>

        </Formik>
        <div className='flex justify-center gap-2 items-center'>
            <p>if you already have account ?</p>
            <Button onClick={()=>navigate("/login")} sx={{ textTransform: 'none' }}>Login</Button>
        </div>


        </>
    )
}


export default  Register
