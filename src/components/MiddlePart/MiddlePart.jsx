
import { Avatar, Card, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import StoryCircle from './StoryCircle';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArticleIcon from '@mui/icons-material/Article';
import PostCard from '../Post/PostCard';
import CreatePostModal from '../CreatePost/CreatePostModal';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPostAction, getLikedCommentsAction } from '../../Redux/Post/post.action';
import { store } from '../../Redux/store';


const story=[11,1,1,1,1]
//const posts=[1,1,1,1,1,1,1]
const MiddlePart = () => {
    const dispatch=useDispatch();
    const {post}=useSelector(store=>store);
    // const { likedComments } = post;

    // console.log("post storee first ",post);
    // console.log("post storee posts ",post.posts);



    
    const[OpenCreatePostModel,setOpenCreatePostModel]=useState(false);
    const handleCloseCreatePostModel=()=>{setOpenCreatePostModel(false);    }
    
    const handleOpenCreatePostModel=(()=>{
        setOpenCreatePostModel(true);
        // console.log("open post model...",OpenCreatePostModel)
    });

    useEffect(()=>{
        dispatch(getAllPostAction())
    },[post.newComment])


    // useEffect(() => {
    //     dispatch(getLikedCommentsAction());
    //   }, [dispatch]);
    return (
        <div className='px-20'>
            <section className=' flex  item-center p-5 rounded-b-md'>
               <div   className='flex flex-col items-center mr-4 cursor-pointer'
              >
                  <Avatar 
                sx={{width:"5rem", height:"5rem"}}
                //src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&s' 
                >
                <AddIcon sx={{frontSize:"3rem"}}/>
               
                </Avatar>
                 <p>New</p>
              </div> 
              {story.map((item)=>(<StoryCircle/>
            ))}

            </section>   

            <Card className='p-5 mt-5'> 
                <div className='flex justify-between'>
                    <Avatar/>
                    <input 
                    onClick={handleOpenCreatePostModel}
                    readOnly className='outline-none w-[90%] rounded-full px-5 bg-transparent border-[#3b4054] border' type='text'/>

                </div>
                <div className='flex justify-center space-x-9 mt-5'>
                    <div className='flex items-center'>
                        <IconButton color="primary" onClick=
                        {handleOpenCreatePostModel}>
                            <ImageIcon/>
                        </IconButton>

                        <span>media</span>

                    </div>

                    <div className='flex items-center'>
                        <IconButton color="primary" onClick=
                        {handleOpenCreatePostModel}>
                            <VideocamIcon/>
                        </IconButton>

                        <span>Video</span>

                    </div>

                    <div className='flex items-center'>
                        <IconButton color="primary" onClick=
                        {handleOpenCreatePostModel}>
                            <ArticleIcon/>
                        </IconButton>

                        <span>Write Article</span>
                    </div>
                </div>
            </Card>
            <div className='mt-5 space-y-5'>
{/* post.posts */}
{/* {post.posts._embedded && post.posts._embedded.postList && post.posts._embedded.postList.map((item) => (
    <PostCard key={item.id} item={item} />
))}                */}
  {Array.isArray(post.posts) && post.posts.map((item) => (
        <PostCard key={item.id} item={item} />
    ))}

            </div>
            <div>
                <CreatePostModal handleClose={handleCloseCreatePostModel} open={OpenCreatePostModel}/>
            </div>
        </div>
    );
};

export default MiddlePart;