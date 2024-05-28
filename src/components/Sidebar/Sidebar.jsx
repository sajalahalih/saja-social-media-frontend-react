import React from 'react';
import { navigationMenu } from './SidebarNavigation';
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logoutUserAction } from '../../Redux/Auth/auth.action';

const Sidebar = () => {
  const {auth}=useSelector(store=>store);
  const navigate =useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate=(item)=>{
    if(item.title==="Profile")
      navigate(`/profile/${auth.user?.id}`)

  }

  const dispatch=useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserAction());
    navigate('/login'); // adjust the path as necessary
    handleClose();
  };


  return (
      <Card className='card h-screen flex flex-col justify-between  py-50'>
        <div className='space-y-8 pl-5'>
          <div className=''>

            <span className='logo font-bold text-xl'>saja social</span>

          </div>

          <div  className='space-y-8'>
            {navigationMenu.map((item)=>(
              // or insted of navigate(item.path) ===> use handleNavigate(item)
            <div onClick={()=>navigate(item.path)} className='cursor-pointer flex space-x-3 items-center'>
              {item.icon}
              <p className='text-xl'>{item.title} </p>
              
              </div>
            ))}

          </div>


          </div> 
          <div >
            <Divider />
            <div className='pl-5 flex items-center justify-between pt-5'>
              <div className='flex items-center space-x-3 '>
                <Avatar src='https://cdn.pixabay.com/photo/2024/05/22/16/37/seagull-8781110_640.jpg'/>
                  <div>
                {/* suppose put fname +lname here */}
                  <p className='font-bold'>{auth.user?.userName}</p>
                  <p className='opacity-70'>@{auth.user?.userName.toLowerCase()}</p>

              </div>



               </div>
               <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       <MoreVertIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>

            </div>
          </div>
      </Card>
  );
};

export default Sidebar;