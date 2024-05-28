import { Avatar, Box, Button, Card, Grid, Tab, Tabs } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../../components/Post/PostCard';
import UserReesCard from '../../components/Reels/UserReelCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import ProfileModel from './ProfileModel';


const tabs=[
    {value:"post",name:"Post"},
    {value:"reels",name:"Reels"},
    {value:"saved",name:"Saved"},
    {value:"repost",name:"Repost"},
];

const posts=[1,1,1,1];
const reels=[1,1,1,1];
const savedPost=[1,1,1,1];
const repost=[1,1,1,1];






const Profile = () => {
    const {post}=useSelector(store=>store);

    const [open, setOpen] = React.useState(false);
    const handleOpenProfileModel = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    const {auth}=useSelector(store=>store);
    console.log("auth in prifile user ",auth.user);
    console.log("auth in prifile ",auth.user.posts[0]);
    const {id}=useParams();
    const [value, setValue] = React.useState('post');
    const chatContainerRef=useRef(null);

    useEffect(()=>{
        if(chatContainerRef.current){
            chatContainerRef.current.scrollTop=chatContainerRef.current.scrollHeight;
        }
    },[])


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const filteredPosts = post.posts.filter(item => item.user.id === auth.user.id);


     // Check if auth.user is defined before rendering
     if (!auth.user) {
        return <div>Loading...</div>; // or some loading spinner
    }
    return (

        <Grid ref={chatContainerRef} container spacing={5}>
            <Grid item xs={0} lg={3}>
           
            <div className='sticky top-0'>
                        <Sidebar/>

                    </div>
            </Grid>

            <Grid item xs={0} lg={9}>
        <Card className='my-10 w-[70%]'>          
            <div className='rounded-md '>
                <div className='h-[15rem]'>
                    <img
                    className='w-full h-full rounded-t-md'
                     src='https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_640.jpg'
                     alt=''/>
                </div>
                <div className='px-5 flex justify-between items-start
                mt-5 h-[5rem]'>
                    <Avatar className='transform -translate-y-24' 
                    sx={{width:"10rem",height:"10rem"}} src='https://cdn.pixabay.com/photo/2024/04/12/15/46/beautiful-8692180_640.png'/>
                    {true? (<Button onClick={handleOpenProfileModel}  sx={{borderRadius:"20px"}} variant='outlined'>Edit Profile</Button>):(
                     <Button sx={{borderRadius:"20px"}} variant='outlined'>Follow</Button>)}
                      
                </div>
                <div className='p-5'>
                    <div>
                        {/* fname and lname hereeeee */}
                        <h1 className='py-1 font-bold text-xl'>{auth.user?.firstName +" "+auth.user?.lastName }</h1>
                        <p>@{auth.user?.userName.toLowerCase()}</p>
                    </div>
                    <div className='flex gap-5 items-center py-3'>
                        <span>{filteredPosts.length} posts</span>
                        <span>{auth.user.followers.length} followers</span>
                        <span>{auth.user.following.length} follwings</span>
                    </div>

                    <div>
                        <p>Lorem ipsum 
                            dolor sit amet consectetur 
                            adipisicing elit.</p>
                    </div>

                </div>

                <section>
                <Box sx={{ width: '100%',borderBottom:1 ,border:"divider"}}> {/*from mui tabs*/}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >  
       
       {tabs.map((item)=> (<Tab value={item.value} label={item.name} wrapped />))}
      </Tabs>
     </Box>
     {/*{auth.user.posts && auth.user.posts.length > 0 ? (
  <div className='space-y-5 w-[70%] my-10'>
    {auth.user.posts.map((item) => (
      <div className='border border-salte-100 rounded-md'>
        <PostCard item={item} />
      </div>
    ))}
  </div>
) : (
  <div>No posts available</div>
)} */}

{/* originalllllllll tahet */}
    {/* <div className='flex justify-center'>
        {value==="post"?<div className='space-y-5 w-[70%]
            my-10'>{auth.user.posts.map((item)=> <div className='border border-salte-100 rounded-md'>
            <PostCard item={item}/> </div>)} */}

<div className='flex justify-center'>
        {value==="post"?<div className='space-y-5 w-[70%]
            my-10'>{filteredPosts.map((item)=> <div className='border border-salte-100 rounded-md'>
            <PostCard key={item.id} item={item}/> </div>)}

        
    {/* <div className='flex justify-center'>
        {value==="post"?<div className='space-y-5 w-[70%]
            my-10'>{posts.map((item)=> <div className='border border-salte-100 rounded-md'>
            <PostCard/> </div>)} */}

        
    </div>:value==="reels"?<div className='flex justify-center flex-wrap gap-2 my-10'>
        {reels.map((item)=> <UserReesCard/>)}


     </div>:value==="saved"?<div className='space-y-5 w-[70%] my-10'> 
        {savedPost.map((item)=> <div className='border border-salte-100 rounded-md'>
            <PostCard/> </div>)}
        
          </div>:(
          <div>Repost</div>
          )}
    </div>  
                </section>
            </div>    
                 <section>
                    <ProfileModel  open={open} handleClose={handleClose} />
                   </section>
        </Card>
        </Grid>
        </Grid>
    );
};

export default Profile;