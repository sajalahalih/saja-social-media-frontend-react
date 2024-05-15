import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const PostCard = () => {
    return (
        <Card className=''>
            <CardHeader //from mui
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="userfullname"
        subheader="@username"
      />

        <CardMedia //frim mui
        component="img"
        height="194"
        image="https://cdn.pixabay.com/photo/2024/03/08/09/47/ai-generated-8620359_640.png"
        alt="Paella dish"
         />
         <CardContent>  {/* from mui */}
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>

      <CardActions className='flex justify-between' disableSpacing> {/* from mui without the logic*/}
        <div>
          <IconButton>
            {true?<FavoriteIcon/>:<FavoriteBorderIcon/>}

          </IconButton>
          
          <IconButton>
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
                
            
        </Card>
    );
};

export default PostCard;