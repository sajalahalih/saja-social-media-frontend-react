import React, { useEffect, useState } from 'react';
import { navigationMenu } from './SidebarNavigation';
import { Avatar, Button, Card, Divider, Menu, MenuItem, useMediaQuery } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { logoutUserAction } from '../../Redux/Auth/auth.action';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  const { auth } = useSelector(store => store);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (item) => {
    if (item.title === "Profile")
      navigate(`/profile/${auth.user?.id}`)
  }

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUserAction());
    navigate('/login');
    handleClose();
  };

  const [isLgScreen, setIsLgScreen] = useState(window.innerWidth >= 1280);

  useEffect(() => {
    const handleResize = () => {
      setIsLgScreen(window.innerWidth >= 1280);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
 // const isLgScreen = useMediaQuery('(min-width:1280px)');
  const maxHeight = isLgScreen ? '730px' : '650px';

  return (
    <Card className='card h-screen flex flex-col justify-between py-50' style={{ maxWidth: '300px',maxHeight }}>
      <div className='space-y-8 pl-5'>
        <div className=''>
          <span className='logo font-bold text-xl hidden lg:block'>saja social</span>
        </div>

        <div className='space-y-8'>
          {navigationMenu.map((item) => (
            <div key={item.title} onClick={() => navigate(item.path)} className='cursor-pointer flex items-center'>
              {item.icon}
              <p className='text-xl hidden lg:block'>{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Conditionally render based on screen size */}
      {isLgScreen ? (
        <div>
          <Divider />
          <div className='pl-5 flex items-center justify-between pt-5'>
            <div className='flex items-center space-x-3 '>
              <Avatar src='https://cdn.pixabay.com/photo/2024/05/22/16/37/seagull-8781110_640.jpg' />
              <div>
                <p className='font-bold'>{auth.user?.userName}</p>
                <p className='opacity-70'>@{auth.user?.userName?.toLowerCase()}</p>
              </div>
            </div>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </Button>
            {/* Conditionally render based on screen size */}
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      ) : (
        <div className="pl-1 pt-1">
          <Button onClick={handleLogout}><LogoutIcon/></Button>
        </div>
      )}
    </Card>
  );
};

export default Sidebar;
