import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { blueGrey } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/Bookmark';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likeCommentAction, likePostAction } from '../../Redux/Post/post.action';
import { isLikedByReqUser } from '../../utils/isLikedByReqUser';
import { isCommentLikedByReqUser } from '../../utils/isCommentLikedByReqUser';
import CommentModel from './CommentModel';

const PostCard = ({ item }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const dispatch = useDispatch();
  const { post, auth } = useSelector(store => store);
  const [open, setOpen] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [initialContent, setInitialContent] = useState('');

  const handleShowComments = () => setShowComments(!showComments);

  const handleCreateComment = () => {
    if (commentInput.trim() === '') return;
    const reqData = {
      postId: item.id,
      data: {
        content: commentInput
      }
    }
    dispatch(createCommentAction(reqData));
    setCommentInput('');
  }

  const handleLikePost = () => {
    dispatch(likePostAction(item.id));
  }

  const handleLikeComment = (commentId) => {
    dispatch(likeCommentAction(commentId));
  };

  const handleEditComment = (comment) => {
    setEditCommentId(comment.id);
    setInitialContent(comment.content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditCommentId(null);
    setInitialContent('');
  };

  if (!item || !item.user) {
    return <div>Invalid post data</div>;
  }

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blueGrey[500] }} aria-label="recipe">
            {item.user.firstName[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user.firstName + " " + item.user.lastName}
        subheader={"@" + item.user.userName}
      />
      {item.video ? (
        <CardMedia
          className='w-full max-h-[30rem] object-cover object-top'
          component="video"
          controls
          src={item.video}
          title={item.caption}
        />
      ) : item.image ? (
        <CardMedia
          className='w-full max-h-[30rem] object-cover object-top'
          component="img"
          height="100"
          image={item.image}
          alt="Post image"
        />
      ) : null}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {item.caption}
        </Typography>
      </CardContent>
      <CardActions className='flex justify-between' disableSpacing>
        <div>
          <IconButton onClick={handleLikePost}>
            {isLikedByReqUser(auth.user.id, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton onClick={handleShowComments}>
            <ChatBubbleIcon />
          </IconButton>
          <IconButton>
            <ShareIcon />
          </IconButton>
        </div>
        <div>
          <IconButton>
            <BookmarkBorderIcon />
          </IconButton>
        </div>
      </CardActions>
      {showComments && (
        <section>
          <div className='flex items-center space-x-5 mx-3 my-5'>
            <Avatar />
            <input
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateComment();
                }
              }}
              className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2'
              type="text"
              placeholder='Write your comment...'
            />
          </div>
          <Divider />
          <div className='mx-3 space-y-2 my-5 text-xs'>
            {item.comments?.map((comment) => (
              <div className='flex items-center justify-between space-x-5' key={comment.id}>
                <div className='flex items-center space-x-5'>
                  <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}>
                    {comment.user.firstName[0]}
                  </Avatar>
                  <p>{comment.content}</p>
                </div>
                <div>
                  {auth.user.id === comment.user.id && (
                    <IconButton onClick={() => handleEditComment(comment)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton onClick={() => handleLikeComment(comment.id)}>
                    {isCommentLikedByReqUser(auth.user.id, comment) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <CommentModel open={open} handleClose={handleClose} postId={item.id} commentId={editCommentId} initialContent={initialContent} />
    </Card>
  );
};

export default PostCard;
