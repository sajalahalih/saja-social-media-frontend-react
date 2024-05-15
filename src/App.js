
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authuntecation/Authentication';
import HomePage from './pages/HomePage/HomePage';
import Message from './pages/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Profile from './pages/Profile/Profile';
import { getProfileAction } from './Redux/Auth/auth.action';


function App() {
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");

  const{auth}=useSelector(store=>store);
  useEffect(()=>{
    dispatch(getProfileAction(jwt))

},[jwt])
  return (
    <div className="">
     {/* <Authentication/> */}
     {/* <HomePage/> */}

     <Routes> 
     {/* <Route path='/home' element={<HomePage/>}/>  */}
     <Route path='/home' element={auth.user?<HomePage/>:<Authentication/>}/>   
     <Route path='/message' element={<Message/>}/>
     <Route path='/*' element={auth.user?<HomePage/>:<Authentication/>}/> 
     <Route path='/profile' element={auth.user?<Profile/>:<Authentication/>}/> 

     </Routes>
    </div>
  );
}

export default App;
