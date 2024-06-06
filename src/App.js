import { Route, Routes, useLocation } from 'react-router-dom';
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
import { gapi } from 'gapi-script';

import LoginButton from "./components/oauth2/login";
import LogoutButton from "./components/oauth2/logout";
import Profilee from './components/SearchUserHome/Profilee';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PrivateRoute from './PrivateRoute';
import AuthProvider from './AuthProvider';

// const clientId="253013366460-phc42gjl56imtidp8uslmqfoh1ljrc73.apps.googleusercontent.com";


function App() {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const location = useLocation();

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


    // useEffect (() => {
    //     function start() {
    //     gapi.client.init({
    //     clientId: clientId,
    //     scope: ""
    //     })
    //     };
    //     gapi.load('client: auth2', start);
    //     });
    // var accessToken = gapi.auth.getToken().access_token;

    
    const isHomePage = location.pathname === '/home';
    const isHomePage2 = location.pathname === '/';
    const islogin = location.pathname === '/login';
    const isre = location.pathname === '/register';

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        {!isHomePage &&!isHomePage2&&!islogin&&!isre&& (
            <FormControlLabel
                control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
                labelPlacement="start"
                style={{ position: 'absolute', top: 10, right: 10 }}
            />
        )}
            <GoogleOAuthProvider clientId='766615511514-0oerbikld91qgta2jp7fk78ti054ookk.apps.googleusercontent.com'>
                <Routes>
                    <Route path='/home' element={auth.user ? <HomePage /> : <Authentication />} />

                    <Route path='/' element={auth.user ? <HomePage /> : <Authentication />} />
                    <Route path='/message' element={<Message />} />
                    <Route path='/profile/:id' element={<Profilee />} />
                    <Route path='/profile' element={auth.user ? <Profile /> : <Authentication />} />
                    <Route path='/login' element={auth.user ? <HomePage /> : <Authentication />} />
                    <Route path='/register' element={auth.user ? <HomePage /> : <Register />} />
                    {/* <Route path='/*' element={auth.user ? <HomePage /> : <Authentication />} />*/}
                    <Route path='/*' element={<PageNotFound />} />
                </Routes>
            </GoogleOAuthProvider>
            
        </ThemeProvider>
    );
}

export default App;






// function App() {
//     const dispatch = useDispatch();
//     const jwt = localStorage.getItem("jwt");
//     const location = useLocation();

//     const { auth } = useSelector(store => store);
//     useEffect(() => {
//         dispatch(getProfileAction(jwt));
//     }, [dispatch, jwt]);

//     // Retrieve the theme preference from localStorage
//     const storedThemePreference = localStorage.getItem('isDarkMode') === 'true';
//     const [isDarkMode, setIsDarkMode] = useState(storedThemePreference);

//     const toggleTheme = () => {
//         setIsDarkMode(prevMode => {
//             const newMode = !prevMode;
//             // Store the updated theme preference in localStorage
//             localStorage.setItem('isDarkMode', newMode);
//             return newMode;
//         });
//     };


//     // useEffect (() => {
//     //     function start() {
//     //     gapi.client.init({
//     //     clientId: clientId,
//     //     scope: ""
//     //     })
//     //     };
//     //     gapi.load('client: auth2', start);
//     //     });
//     // var accessToken = gapi.auth.getToken().access_token;


//     const isHomePage = location.pathname === '/home';
//     const isHomePage2 = location.pathname === '/';
//     const islogin = location.pathname === '/login';
//     const isre = location.pathname === '/register';

//     //     return (
//     //         <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
//     //         <CssBaseline />
//     //         {!isHomePage &&!isHomePage2&&!islogin&&!isre&& (
//     //             <FormControlLabel
//     //                 control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
//     //                 labelPlacement="start"
//     //                 style={{ position: 'absolute', top: 10, right: 10 }}
//     //             />
//     //         )}
//     //             <GoogleOAuthProvider clientId='766615511514-0oerbikld91qgta2jp7fk78ti054ookk.apps.googleusercontent.com'>
//     //                 <Routes>
//     //                     <Route path='/home' element={auth.user ? <HomePage /> : <Authentication />} />

//     //                     <Route path='/' element={auth.user ? <HomePage /> : <Authentication />} />
//     //                     <Route path='/message' element={<Message />} />
//     //                     <Route path='/profile/:id' element={<Profilee />} />
//     //                     <Route path='/profile' element={auth.user ? <Profile /> : <Authentication />} />
//     //                     <Route path='/login' element={auth.user ? <HomePage /> : <Authentication />} />
//     //                     <Route path='/register' element={auth.user ? <HomePage /> : <Register />} />
//     //                     {/* <Route path='/*' element={auth.user ? <HomePage /> : <Authentication />} />*/}
//     //                     <Route path='/*' element={<PageNotFound />} />
//     //                 </Routes>
//     //             </GoogleOAuthProvider>

//     //         </ThemeProvider>
//     //     );
//     // }

//     // export default App;



//     return (
    
//             <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
//               <CssBaseline />
//               <FormControlLabel
//                 control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
//                 labelPlacement="start"
//                 style={{ position: 'absolute', top: 10, right: 10 }}
//               />
//               <GoogleOAuthProvider clientId='your-client-id'>
//                 <AuthProvider>
//                   <Routes>
//                     <Route element={<PrivateRoute />}>
//                       <Route path='/home' element={<HomePage />} />
//                       <Route path='/' element={<HomePage />} />
//                       <Route path='/message' element={<Message />} />
//                       <Route path='/profile/:id' element={<Profile />} />
//                       <Route path='/profile' element={auth.user ? <Profile /> : <Authentication />} />
//                       <Route path='/*' element={<PageNotFound />} />
//                     </Route>
//                     <Route path='/login' element={<Authentication />} />
//                     <Route path='/register' element={auth.user ? <HomePage /> : <Register />} />
//                   </Routes>
//                 </AuthProvider>
//               </GoogleOAuthProvider>
//             </ThemeProvider>
//           );
//         }

// export default App;




// // return (
// //     <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
// //         {/* <LoginButton/>
// //         <LogoutButton/> */}
// //         <CssBaseline />
// //         <FormControlLabel
// //             control={<Switch checked={isDarkMode} onChange={toggleTheme} />}
// //             labelPlacement="start"
// //             style={{ position: 'absolute', top: 10, right: 10 }}
// //         />
// //         <GoogleOAuthProvider clientId='766615511514-0oerbikld91qgta2jp7fk78ti054ookk.apps.googleusercontent.com'>
            
// //             <Routes>
// //                 <Route element={<PrivateRoutes/>}>
// //                 <Route path='/home' element={<HomePage />}  />

// //                 <Route path='/' element= {<HomePage /> } />
// //                 <Route path='/message' element={<Message />} />
// //                 <Route path='/profile/:id' element={<Profilee />} />
// //                 <Route path='/profile' element={auth.user ? <Profile /> : <Authentication />} />
                
// //                 {/* <Route path='/*' element={auth.user ? <HomePage /> : <Authentication />} />*/}
// //                 <Route path='/*' element={<PageNotFound />} />
// //                 </Route>
// //                 <Route path='/login' element= {<HomePage />}  />
// //                  <Route path='/register' element={auth.user ? <HomePage /> : <Register />} />
               
// //             </Routes>
// //         </GoogleOAuthProvider>
// //     </ThemeProvider>
// // );
// // }

// // export default App;