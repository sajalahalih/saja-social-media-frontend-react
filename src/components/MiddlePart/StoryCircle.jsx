import { Avatar } from '@mui/material';
import React from 'react';

const StoryCircle = ({ item }) => {
  return (
    <div className='flex flex-col items-center mr-3 sm:mr-3.5 md:mr-4 lg:mr-5 cursor-pointer'>
      <Avatar
        sx={{
          width: { xs: '3rem', sm: '3.5rem', md: '4rem', lg: '4.5rem', xl: '5rem' },
          height: { xs: '3rem', sm: '3.5rem', md: '4rem', lg: '4.5rem', xl: '5rem' }
        }}
        src={item.image}
      />
      <p className='text-[10px] sm:text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px]'>
        {item.name}
      </p>
    </div>
  );
};

export default StoryCircle;
