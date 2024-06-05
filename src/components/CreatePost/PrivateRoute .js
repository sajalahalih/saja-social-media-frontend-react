// src/components/PrivateRoute.js
import {React,Outlet} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoutes = () => {
    const { auth } = useSelector((store) => store);
   // console.log("element",element)
    return( 

        auth.user ? <Outlet/> : <Navigate to="/login" />
    
    );
};

export default PrivateRoutes;
