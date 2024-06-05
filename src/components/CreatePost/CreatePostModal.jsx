import { Avatar, Backdrop, Box, Button, CircularProgress, IconButton, Modal } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import VideocamIcon from '@mui/icons-material/Videocam';
import { uplodeToCloudinary } from '../../utils/uplodeToCloudniry';
import { useDispatch, useSelector } from 'react-redux';
import { createPostAction } from '../../Redux/Post/post.action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 400, md: 500 },  // Adjusting the width for responsiveness
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: { xs: 2, sm: 3, md: 4 },  // Adjusting padding for responsiveness
  borderRadius: ".6rem",
  outline: "none"
};

const CreatePostModal = ({ handleClose, open }) => {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedVideo, setSelectedVideo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);

  const handleSelectImage = async (event) => {
    setIsLoading(true);
    const imageUrl = await uplodeToCloudinary(event.target.files[0], "image");
    setSelectedImage(imageUrl);
    setIsLoading(false);
    formik.setFieldValue("image", imageUrl);
  };

  const handleSelectVideo = async (event) => {
    setIsLoading(true);
    const videoUrl = await uplodeToCloudinary(event.target.files[0], "video");
    setSelectedVideo(videoUrl);
    setIsLoading(false);
    formik.setFieldValue("video", videoUrl);
  };

  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      video: ""
    },
    onSubmit: (values) => {
      dispatch(createPostAction(values));
    }
  });

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className='flex space-x-2 sm:space-x-3 md:space-x-4 items-center'>
              <Avatar sx={{ width: { xs: 30, sm: 40, md: 50 }, height: { xs: 30, sm: 40, md: 50 } }} />
              <div>
                <p className='font-bold text-sm sm:text-base md:text-lg'>{auth.user?.firstName + " " + auth.user?.lastName}</p>
                <p className='text-xs sm:text-sm md:text-base'>@{auth.user?.userName}</p>
              </div>
            </div>

            <textarea 
              className='outline-none w-full mt-2 sm:mt-3 md:mt-5 p-2 sm:p-3 md:p-4 bg-transparent border border-[#3b4054] rounded-sm'
              placeholder='write caption....'
              name="caption"
              onChange={formik.handleChange}
              value={formik.values.caption}
              rows={4}
            />

            <div className='flex space-x-3 sm:space-x-4 md:space-x-5 items-center mt-3 sm:mt-4 md:mt-5'>
              <div>
                <input 
                  type="file" 
                  accept='image/*' 
                  onChange={handleSelectImage} 
                  style={{ display: "none" }} 
                  id='image-input' 
                />
                <label htmlFor="image-input">
                  <IconButton color='primary' component="span">
                    <ImageIcon />
                  </IconButton>
                </label>
                <span className='text-xs sm:text-sm md:text-base'>Image</span>
              </div>

              <div>
                <input 
                  type="file" 
                  accept='video/*' 
                  onChange={handleSelectVideo} 
                  style={{ display: "none" }} 
                  id='video-input' 
                />
                <label htmlFor="video-input">
                  <IconButton color='primary' component="span">
                    <VideocamIcon />
                  </IconButton>
                </label>
                <span className='text-xs sm:text-sm md:text-base'>Video</span>
              </div>
            </div>

            {selectedImage && <div className='mt-3'>
              <img className='h-20 sm:h-30 md:h-40' src={selectedImage} alt="" />
            </div>}

            {selectedVideo && <div className='mt-3'>
              <video className='h-20 sm:h-30 md:h-40' controls src={selectedVideo}></video>
            </div>}

            <div className='flex w-full justify-end mt-3'>
              <Button variant="contained" type="submit" sx={{ borderRadius: "1.5rem", fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>
                Post
              </Button>
            </div>
          </div>
        </form>

        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading} onClick={handleClose}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
