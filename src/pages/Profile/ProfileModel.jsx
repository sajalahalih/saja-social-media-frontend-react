import * as React from 'react';
import { Box, Button, Modal, Avatar, IconButton, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { updateProfileAction } from '../../Redux/Auth/auth.action';
import CloseIcon from '@mui/icons-material/Close';
import { uplodeToCloudinary } from '../../utils/uplodeToCloudniry';
import { useState } from 'react';

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  outline: "none",
  overflow: "scroll-y",
  borderRadius: 3,
};

export default function ProfileModel({ open, handleClose }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      image:""
    },
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(updateProfileAction(values));
    },
  });


  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectImage = async (e) => {
    setLoading(true);
    const imgUrl = await uplodeToCloudinary(e.target.files[0], "image");
    setSelectedImage(imgUrl);
    setLoading(false);
};

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
                <p>Edit Profile</p>
              </div>
              <Button type='submit'>Save</Button>
            </div>
            <div>
              <div className='h-[15rem]'>
                <img
                  className='w-full h-full rounded-t-md'
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlRYwS5A0rCCfblZi-Tt2sj8U7LzDZ1u6x1g&s"
                  alt=""
                />
              </div>
              <div className='pl-5'>
                <Avatar
                  className='transform -translate-y-14'
                  sx={{ width: "10rem", height: "10rem" }}
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnFf6DXcgRxe71BOQm1orHpnKjJloo9c2jg&s'
                />
              </div>
            </div>
            <div className='space-y-3'>
              <TextField
                fullWidth
                id='firstName'
                name='firstName'
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
              />
              <TextField
                fullWidth
                id='lastName'
                name='lastName'
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
               <div>
                                        <input type="file" accept='image/*' onChange={handleSelectImage} className='hidden' id='image-input' />
                                        <label htmlFor="image-input">
                                            <AddPhotoAlternateIcon />
                                        </label>
                                    </div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
