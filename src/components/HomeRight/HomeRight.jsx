import React from 'react';
import PopularUserCard from './PopularUserCard';
import { Card } from '@mui/material';
import SearchUser from '../SearchUserHome/SearchUserHome';

const obj1={
    username:'jijijamil',
    name:"Jiji"
}
const obj2={
    username:'malakibrahim',
    name:"Malak"
}
const obj3={
    username:'bisoshlomo',
    name:"Bisan"
}
const obj4={
    username:'sosoesh',
    name:"Soso"
}
const obj5={
    username:'drayah',
    name:"DR.Ayah"
}

const popularUser=[1,1,1,1,1]
const HomeRight = () => {
    return (
        <div className='pr-5'>
            <SearchUser/>

            <Card className='p-5'>

            <div className='flex justify-between py-5 items-center'>
                <p className='font-semibold opacity-70'>Suggestions for you</p>
                <p className='text-xs font-semibold opacity-95'>View All</p>

            </div>

            <div className=''>
                {/* <PopularUserCard/> */}
                {/* {popularUser.map((item)=><PopularUserCard key={item.id}/>)} */}


                <PopularUserCard item={obj1}/>
            <PopularUserCard item={obj2}/>
            <PopularUserCard item={obj3}/>
            <PopularUserCard item={obj4}/>
            <PopularUserCard item={obj5}/>
            
            </div>
            </Card>


            
        </div>
    );
};

export default HomeRight;