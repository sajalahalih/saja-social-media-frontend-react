import { Avatar } from '@mui/material';
import React from 'react';

const StoryCircle = (item) => {
    console.log("story",item.item.name)
    return (
        <div>
              <div   className='flex flex-col items-center mr-4 cursor-pointer'
              >
                  <Avatar
                sx={{width:"5rem", height:"5rem"}}
                src={item.item.image}
                >
                
               
                </Avatar>
                 <p>{item.item.name}</p>
              </div>  
        </div>
    );
};

export default StoryCircle;