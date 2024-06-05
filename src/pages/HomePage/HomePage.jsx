import { Grid, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from "react-router-dom";
import MiddlePart from '../../components/MiddlePart/MiddlePart';
import Reels from '../../components/Reels/Reels';
import CreateReelsForm from '../../components/Reels/CreateReelsForm';
import Profile from '../Profile/Profile';
import HomeRight from '../../components/HomeRight/HomeRight';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from '../../Redux/Auth/auth.action';

import { store } from '../../Redux/store';

const HomePage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector(store => store);

    const isMobile = useMediaQuery('(max-width:600px)');
    const isLgScreen = useMediaQuery('(min-width:1280px)');

    return (
        <div className='px-0'>
            <Grid container spacing={10}>
                <Grid item xs={3} lg={3} sm={5} md={5}>
                    <div className='sticky top-0'>
                        <Sidebar />
                    </div>
                </Grid>

                <Grid 
                    lg={location.pathname === "/home" || location.pathname === "/" ? 6 : 9}
                    item className='px-5 flex justify-center' 
                    xs={7} sm={7} md={7}
                >
                    <Routes>
                        <Route path="/" element={<MiddlePart />} />
                        <Route path="/reels" element={<Reels />} />
                        <Route path="/create-reels" element={<CreateReelsForm />} />
                        <Route path="/profile/:id" element={<Profile />} />
                    </Routes>
                </Grid>

                {isLgScreen && (location.pathname === "/home" || location.pathname === "/") && (
                    <Grid item lg={3} className='relative'>
                        <div className='sticky top-0 w-full'>
                            <HomeRight />
                        </div>
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default HomePage;
