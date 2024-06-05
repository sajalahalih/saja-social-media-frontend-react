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
import { getAllPostAction } from '../../Redux/Post/post.action';

const story = [11, 1, 1, 1, 1];

const MiddlePart = () => {
  const dispatch = useDispatch();
  const { post } = useSelector(store => store);

  const obj1 = {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsynwv-5qtogtOwJbIjaPFJUmHpzhxgqIAug&s',
    name: 'Jiji'
  };
  const obj2 = {
    image: 'https://cdn.pixabay.com/photo/2015/01/06/16/14/woman-590490_640.jpg',
    name: 'Malak'
  };
  const obj3 = {
    image: 'https://cdn.pixabay.com/photo/2021/09/20/03/24/skeleton-6639547_640.png',
    name: 'Bisan'
  };
  const obj4 = {
    image: 'https://cdn.pixabay.com/photo/2020/10/11/19/51/cat-5646889_640.jpg',
    name: 'Soso'
  };
  const obj5 = {
    image: 'https://cdn.pixabay.com/photo/2024/05/21/15/17/gallop-8778395_640.jpg',
    name: 'Ayah'
  };

  const [OpenCreatePostModel, setOpenCreatePostModel] = useState(false);
  const handleCloseCreatePostModel = () => {
    setOpenCreatePostModel(false);
  };

  const handleOpenCreatePostModel = () => {
    setOpenCreatePostModel(true);
  };

  useEffect(() => {
    dispatch(getAllPostAction());
  }, [post.newComment]);

  return (
    <div className='px-1 sm:px-2 md:px-3 lg:px-4'>
      <section className='flex items-center p-1 sm:p-1.5 md:p-2 lg:p-2.5 rounded-b-md'>
        <div className='flex flex-col items-center mr-1 sm:mr-1.5 md:mr-2 lg:mr-2.5 cursor-pointer'>
          <Avatar
            sx={{
              width: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' },
              height: { xs: '1.5rem', sm: '2rem', md: '2.5rem', lg: '3rem' }
            }}
          >
            <AddIcon sx={{ fontSize: { xs: '0.75rem', sm: '1rem', md: '1.25rem', lg: '1.5rem' } }} />
          </Avatar>
          <p className='text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px]'>New</p>
        </div>

        <StoryCircle item={obj1} />
        <StoryCircle item={obj2} />
        <StoryCircle item={obj3} />
        <StoryCircle item={obj4} />
        <StoryCircle item={obj5} />
      </section>

      <Card className='p-1 sm:p-1.5 md:p-2 lg:p-2.5 mt-2 sm:mt-3 md:mt-4 lg:mt-5'>
        <div className='flex justify-between'>
          <Avatar
            sx={{
              width: { xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem' },
              height: { xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2.5rem' }
            }}
          />
          <input
            onClick={handleOpenCreatePostModel}
            readOnly
            className='outline-none w-[90%] rounded-full px-1 bg-transparent border-[#3b4054] border text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px]'
            type='text'
          />
        </div>
        <div className='flex justify-center space-x-1 sm:space-x-1.5 md:space-x-2 lg:space-x-2.5 mt-1 sm:mt-1.5 md:mt-2 lg:mt-2.5'>
          <div className='flex items-center'>
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <ImageIcon sx={{ fontSize: { xs: '0.75rem', sm: '1rem', md: '1.25rem', lg: '1.5rem' } }} />
            </IconButton>
            <span className='text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px]'>Media</span>
          </div>

          <div className='flex items-center'>
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <VideocamIcon sx={{ fontSize: { xs: '0.75rem', sm: '1rem', md: '1.25rem', lg: '1.5rem' } }} />
            </IconButton>
            <span className='text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px]'>Video</span>
          </div>

          <div className='flex items-center'>
            <IconButton color="primary" onClick={handleOpenCreatePostModel}>
              <ArticleIcon sx={{ fontSize: { xs: '0.75rem', sm: '1rem', md: '1.25rem', lg: '1.5rem' } }} />
            </IconButton>
            <span className='text-[8px] sm:text-[10px] md:text-[12px] lg:text-[14px]'>Write Article</span>
          </div>
        </div>
      </Card>

      <div className='mt-1 sm:mt-1.5 md:mt-2 lg:mt-2.5 space-y-1 sm:space-y-1.5 md:space-y-2 lg:space-y-2.5'>
        {Array.isArray(post.posts) && post.posts.map((item) => (
          <PostCard key={item.id} item={item} />
        ))}
      </div>
      <div>
        <CreatePostModal handleClose={handleCloseCreatePostModel} open={OpenCreatePostModel} />
      </div>
    </div>
  );
};

export default MiddlePart;
