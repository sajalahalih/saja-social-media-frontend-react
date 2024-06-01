import { Avatar, Box, Button, Card, Grid, Tab, Tabs } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PostCard from '../Post/PostCard';
import UserReesCard from '../Reels/UserReelCard';
import Sidebar from '../Sidebar/Sidebar';
import { useSelector } from 'react-redux';



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






const Profilee = (user) => {

    const location = useLocation();
     user = location.state?.user;
    console.log("profileeeeeeeeeeeeeee",user.id)
  
    const {post}=useSelector(store=>store);
   
    console.log(" in prifilee user ",user);
    //console.log(" in prifilee ",user.posts[0]);
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
   
    //const post=user.post;

     const filteredPosts = post.posts.filter(item => item.user.id === user.id);
 


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
                    {false? (<Button   sx={{borderRadius:"20px"}} variant='outlined'>Edit Profile</Button>):(
                     <Button sx={{borderRadius:"20px"}} variant='outlined'>Follow</Button>)}
                      
                </div>
                <div className='p-5'>
                    <div>
                        {/* fname and lname hereeeee */}
                        <h1 className='py-1 font-bold text-xl'>{user?.firstName +" "+user?.lastName }</h1>
                       
                        <p>@{user?.userName.toLowerCase()}</p>
                      
                    </div>
                    <div className='flex gap-5 items-center py-3'>
                        <span>{filteredPosts.length} posts</span>
                      
                        <span>{user.followers.length} followers</span>
                      
                        <span>{user.following.length} follwings</span>
                       
                    </div>

                    <div>
                        <p>leve palestina.</p>
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



<div className='flex justify-center'>
        {value==="post"?<div className='space-y-5 w-[70%]
            my-10'>{filteredPosts.map((item)=> <div className='border border-salte-100 rounded-md'>
            <PostCard key={item.id} item={item}/> </div>)
            }

        
    {/* <div className='flex justify-center'>
        {value==="post"?<div className='space-y-5 w-[70%]
            my-10'>{posts.map((item)=> <div className='border border-salte-100 rounded-md'>
            <PostCard/> </div>)} */}

        
    </div>:value==="reels"?<div className='flex justify-center flex-wrap gap-2 my-10'>
        {reels.map((item)=> <UserReesCard/>)}


     </div>:(
          <div>posts</div>
          )}
    </div>  
                </section>
            </div>    
                
        </Card>
        </Grid>
        </Grid>
    );
};

export default Profilee;