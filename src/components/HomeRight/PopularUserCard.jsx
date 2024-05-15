import { Avatar, Button, CardHeader, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const PopularUserCard = () => {
    return (
        <div>
             <CardHeader //from mui -card component
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        <Button size='small'>
            FOLLOW
        </Button>

        }
        title="Saja lahalih"
        subheader="@saja"
      />
        </div>
    );
};

export default PopularUserCard;