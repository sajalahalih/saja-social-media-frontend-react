import React, { useEffect } from 'react';
import { Box, Button, Modal, IconButton, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { updateCommentAction } from '../../Redux/Post/post.action';

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

export default function CommentModel({ open, handleClose, postId, commentId, initialContent }) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      content: initialContent || ""
    },
    enableReinitialize: true, // This allows the form to reset with new initial values
    onSubmit: (values, { setSubmitting }) => {
      dispatch(updateCommentAction(postId, commentId, values)).then(() => {
        setSubmitting(false);
        handleClose();
      });
    },
  });

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
                <p>Edit Comment</p>
              </div>
              <Button type='submit' disabled={formik.isSubmitting}>Save</Button>
            </div>
            <div className='space-y-3'>
              <TextField
                fullWidth
                id='content'
                name='content'
                label=""
                value={formik.values.content}
                onChange={formik.handleChange}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
