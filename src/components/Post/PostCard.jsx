import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likeCommentAction, likePostAction } from '../../Redux/Post/post.action';
import { isLikedByReqUser } from '../../utils/isLikedByReqUser';
import { isCommentLikedByReqUser } from '../../utils/isCommentLikedByReqUser';

const PostCard = ({item}) => {
  console.log("item postcard user",item)
  const[showComments,setShowComments]=useState(false);
  const dispatch=useDispatch();
  const { likedComments } = useSelector((state) => state.post);

  const handleShowComments=()=>setShowComments(!showComments);
  const {post,auth}=useSelector(store=>store);
  // console.log("post for comment ",post)
 
  
  const handleCreateComment=(content)=>{
    const reqData={
      postId:item.id,
      data:{
        content
      }
        
    }
    dispatch(createCommentAction(reqData))

}

const handleLikePost=()=>{
  dispatch(likePostAction(item.id));
}

const handleLikeComment = (commentId) => {
  dispatch(likeCommentAction(commentId));
};

//console.log("the postCard ",item);
if (!item || !item.user) {
  return <div>Invalid post data</div>; // Handle undefined user property gracefully
}
  return (
        <Card className=''>
            <CardHeader //from mui
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
            {/* {item.user.firstName[0]} */}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user.firstName+" "+item.user.lastName}
        subheader={"@"+item.user.userName}
      />

        {/* <CardMedia //frim mui
        component="img"
        height="100"
        image={item.image}
        alt="Paella dish"
         /> */}

        
        
         {/* <img className='w-full max-h-[30rem] object-cover object-top' src={item.image} alt="" />
 <CardContent>  {/* from mui */}


        {/* <Typography variant="body2" color="text.secondary">
         {item.caption}
        </Typography>


      </CardContent>} */}
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
) : (
  <CardContent>
    <Typography variant="body2" color="text.secondary">
      {item.caption}
    </Typography>
  </CardContent>
)} 

        
     

      <CardActions className='flex justify-between' disableSpacing> {/* from mui without the logic*/}
        <div>
          <IconButton onClick={handleLikePost}>
            {isLikedByReqUser(auth.user.id,item)?<FavoriteIcon/>:<FavoriteBorderIcon/>}

          </IconButton>

                   
          <IconButton onClick={handleShowComments}>
            {<ChatBubbleIcon/>}

          </IconButton>

          <IconButton>
            {<ShareIcon/>}
          </IconButton>             

        </div>
        
        <div>
          <IconButton>
              {true?<BookmarkIcon/>:<BookmarkBorderIcon/>}

          </IconButton>
      
        </div>
      </CardActions>
{/* COMMENT */}
     {showComments && <section>
        <div className='flex items-center space-x-5 mx-3 my-5'>
          <Avatar sx={{}}/>
          <input onKeyPress={(e)=>{
            if(e.target.value ==="")return;
            if(e.key==="Enter"){
              handleCreateComment(e.target.value)
              console.log("enter pressed -----",e.target.value)
            }
            
            
          }} className='w-full outline-none bg-transparent border 
          border-[#3b4054] rounded-full px-5 py-2' type="text"
          placeholder='write your comment...' />



        </div>

        <Divider/>
        <div className='mx-3 space-y-2 my-5 text-xs'>
  {item.comments?.map((comment) => (
    <div className='flex items-center justify-between space-x-5' key={comment.id}>
      <div className='flex items-center space-x-5'>
        <Avatar sx={{height:"2rem", width:"2rem", fontSize:".8rem"}}>
          {comment.user.firstName[0]}
        </Avatar>
        <p>{comment.content}</p>
      </div>
      <div>
        <IconButton onClick={() => handleLikeComment(comment.id)}>
          {isCommentLikedByReqUser(auth.user.id, comment) ? (
            <FavoriteIcon /> ) : (<FavoriteBorderIcon />)
            }
        </IconButton>
      </div>
    </div>
  ))}
</div>


      </section>}
                
            
        </Card>
    );
};

export default PostCard;