import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authuntecation/Authentication';
import HomePage from './pages/HomePage/HomePage';
import Message from './pages/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Profile from './pages/Profile/Profile';
import { getProfileAction } from './Redux/Auth/auth.action';
import Register from './pages/Authuntecation/Register';
import Login from './pages/Authuntecation/Loging';
import { ThemeProvider, CssBaseline, Switch, FormControlLabel } from '@mui/material';
import { darkTheme, lightTheme } from './theam/DarkTheme';
import PageNotFound from './pages/PageNotFound ';

function App() {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const { auth } = useSelector(store => store);
    useEffect(() => {
        dispatch(getProfileAction(jwt));
    }, [dispatch, jwt]);

    // Retrieve the theme preference from localStorage
    const storedThemePreference = localStorage.getItem('isDarkMode') === 'true';
    const [isDarkMode, setIsDarkMode] = useState(storedThemePreference);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => {
            const newMode = !prevMode;
            // Store the updated theme preference in localStorage
            localStorage.setItem('isDarkMode', newMode);
            return newMode;
        });
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <FormControlLabel
                control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
                labelPlacement="start"
                style={{ position: 'absolute', top: 10, right: 10 }}
            />
            <Routes>
                <Route path='/home' element={auth.user ? <HomePage /> : <Authentication />} />
                
                <Route path='/' element={auth.user ? <HomePage /> : <Authentication />} />
                <Route path='/message' element={<Message />} />
                <Route path='/saja' element={<Login />} />
                <Route path='/profile' element={auth.user ? <Profile /> : <Authentication />} />
                <Route path='/login' element={auth.user ? <HomePage /> : <Authentication />} />
                <Route path='/register' element={auth.user ? <HomePage /> : <Register />} />
                {/* <Route path='/*' element={auth.user ? <HomePage /> : <Authentication />} />*/}
                <Route path='/*' element={<PageNotFound />} /> 
            </Routes>
        </ThemeProvider>
    );
}

export default App;
