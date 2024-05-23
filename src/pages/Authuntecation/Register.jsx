// import React, { useState } from 'react';
// import { Button, Card, Grid } from '@mui/material';
// import TextField from '@mui/material/TextField';
// import { ErrorMessage, Field, Form, Formik } from 'formik';
// import * as Yup from 'yup';
// import { registerUserAction } from '../../Redux/Auth/auth.action';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';




// // const initialValues={firstName:"",lastName:"",  email:"", password:"",gender:""};
// const initialValues={username:"",  email:"",firstName:"",lastName:"", password:""};
// const validationSchema={
//     email:Yup.string().email("Invalid email").required("Email is required ")
//     ,password:Yup.string()
//     .min(6,"Password must be at least 6 characters")
//     .required("Password is required"),
// };

// const Register=()=>{
//     // const[gender,setGender]=useState("");
//     const dispatch =useDispatch();
//     const navigate=useNavigate();

//     const handleSubmit=(values)=>{
//         // values.gender=gender;
//         console.log("handle submit",values);

        
//         dispatch(registerUserAction({data:values}))
//     };

//     // const handlechange=(event)=>{
//     //     setGender(event.target.value);
//     // }

//     return(
//         <>

// <div>  
//             <Grid container>
//                 <Grid className='h-screen overflow-hidden' item xs={7}>
//                     <img className='h-full w-full' src='https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148881320.jpg' alt=''/>
//                 </Grid>
//                 <Grid item xs={5}>
//                     <div className='px-20 flex flex-col justify-center h-full'>
//                         <Card className='card p-8'>
//                             <div className='flex flex-col item-center mb-5 space-y-1'>
//                             <h1 className='log text-center'> Saja social</h1>
//                             <p className='text-center text-sm w-[70&]'> Connecting Lives, Sharing moments: your social world, your way</p>
//                             </div>

//         <Formik
//          onSubmit={handleSubmit}
//         //   validationSchema={validationSchema}
//            initialValues={initialValues}
//            >
         

//             <Form className='space-y-5'> 
//               <div>
//                 <div className='space-y-5'>
//                 <div>
//                     <Field as ={TextField} name="username" label="User Name" type='text' variant="outlined" fullWidth/>

//                         <ErrorMessage name='username' component={"div"} className='text-red-500'/>
//                     </div>
                  
//                     <div>
//                     <Field as ={TextField} name="email" label="Email" type='email' variant="outlined" fullWidth/>

//                         <ErrorMessage name='email' component={"div"} className='text-red-500'/>
//                     </div>

//                     <div>
//                     <Field as ={TextField} name="firstName" label="First Name" type='text' variant="outlined" fullWidth/>

//                         <ErrorMessage name='firstName' component={"div"} className='text-red-500'/>
//                     </div>

//                     <div>
//                     <Field as ={TextField} name="lastName" label="Last Name" type='text' variant="outlined" fullWidth/>

//                         <ErrorMessage name='lastName' component={"div"} className='text-red-500'/>
//                     </div>

//                     <div>

                    
//                     <Field as ={TextField} name="password" label="Password" type='password' variant="outlined"  fullWidth />

                      
//                         <ErrorMessage name='password' component="div" className='text-red-500'/>
//                     </div>
//                     {/* <RadioGroup onChange={handlechange}
//         row
//         aria-label="gender"
//         name="gender"
//       >
//         <FormControlLabel value="female" control={<Radio />} label="Female" />
//         <FormControlLabel value="male" control={<Radio />} label="Male" />
//         <ErrorMessage name='gender' component={"div"} className='text-red-500'/>
                 
//       </RadioGroup> */}

//                     </div> 
//                     <Button
//                    sx={{ padding: ".8rem 0rem", marginTop: '1rem' }}
//                      fullWidth
//                      type='submit'
//                      variant='contained' 
//                     color='primary'>Register</Button>
//                 </div>    
//             </Form>

//         </Formik>
//         <div className='flex justify-center gap-2 items-center'>
//             <p>if you already have account ?</p>
//             <Button onClick={()=>navigate("/login")} sx={{ textTransform: 'none' }}>Login</Button>
//         </div>

       
//         </Card>


// </div>
// </Grid>
// </Grid>



// </div>
//         </>
//     )
// }



// export default  Register



import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Grid, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { registerUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const initialValues = { username: "", email: "", firstName: "", lastName: "", password: "" };
const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required "),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error); // Access error state from Redux

    const handleSubmit = (values) => {
        console.log("handle submit", values);
        dispatch(registerUserAction({ data: values }));
    };

    return (
        <Grid container>
            <Grid className='h-screen overflow-hidden' item xs={7}>
                <img className='h-full w-full' src='https://img.freepik.com/free-vector/gradient-network-connection-background_23-2148881320.jpg' alt='' />
            </Grid>
            <Grid item xs={5}>
                <div className='px-20 flex flex-col justify-center h-full'>
                    <Card className='card p-8'>
                        <div className='flex flex-col item-center mb-5 space-y-1'>
                            <h1 className='log text-center'>Saja social</h1>
                            <p className='text-center text-sm w-[70&]'>Connecting Lives, Sharing moments: your social world, your way</p>
                        </div>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            <Form className='space-y-5'>
                                <div className='space-y-5'>
                                    <Field as={TextField} name="username" label="User Name" type='text' variant="outlined" fullWidth />
                                    <ErrorMessage name='username' component={"div"} className='text-red-500' />

                                    <Field as={TextField} name="email" label="Email" type='email' variant="outlined" fullWidth />
                                    <ErrorMessage name='email' component={"div"} className='text-red-500' />

                                    <Field as={TextField} name="firstName" label="First Name" type='text' variant="outlined" fullWidth />
                                    <ErrorMessage name='firstName' component={"div"} className='text-red-500' />

                                    <Field as={TextField} name="lastName" label="Last Name" type='text' variant="outlined" fullWidth />
                                    <ErrorMessage name='lastName' component={"div"} className='text-red-500' />

                                    <Field as={TextField} name="password" label="Password" type='password' variant="outlined" fullWidth />
                                    <ErrorMessage name='password' component="div" className='text-red-500' />
                                </div>

                                {error && <div className='text-red-500'>{error}</div>} {/* Display error message */}

                                <Button
                                    sx={{ padding: ".8rem 0rem", marginTop: '1rem' }}
                                    fullWidth
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                >
                                    Register
                                </Button>
                            </Form>
                        </Formik>

                        <div className='flex justify-center gap-2 items-center'>
                            <p>if you already have account ?</p>
                            <Button onClick={() => navigate("/login")} sx={{ textTransform: 'none' }}>Login</Button>
                        </div>
                    </Card>
                </div>
            </Grid>
        </Grid>
    );
};

export default Register;
