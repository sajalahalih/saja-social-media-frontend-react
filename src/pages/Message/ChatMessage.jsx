import React from 'react';
import { useSelector } from 'react-redux';

const ChatMessage = (item) => {
   // console.log("image on item",item)
    const{message,auth}=useSelector(store=>store);
    const isReqUserMessage=auth.user?.id===item.item.user.id
   // console.log ("content",item.item.content)
    return (
        <div className={`flex ${isReqUserMessage?"justify-start":"justify-end"} text-white`}>
        <div className={`p-1 ${item.item.image?"rounded-md":"px-5 rounded-full"} bg-[#191c29]`}>
           {item.item.image &&<img className='w-[12rem] h-[17rem] oblect-cover rounded-md' alt='' src={item.item.image}/>}
            <p className={`${true?"py-2":"py-1"}`}>{item.item.content}</p>
        </div>
        </div>
    );
};

export default ChatMessage;