import { Avatar, Button, CardHeader, IconButton } from '@mui/material';
import { blue, blueGrey, red } from '@mui/material/colors';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const PopularUserCard = (item) => {


  const name = item.item.name;
  const firstLetter = name ? name.charAt(0) : '';
    return (
        <div>
             <CardHeader //from mui -card component
        avatar={
          <Avatar sx={{ bgcolor: blueGrey[500] }} aria-label="recipe">
            {firstLetter}
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
        title={name}
        subheader={"@"+item.item.username}
              />
        </div>
    );
};

export default PopularUserCard;