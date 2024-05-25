import { Avatar, Card, CardHeader } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../../Redux/Auth/auth.action';
import { createChat } from '../../Redux/Message/message.action';

const SearchUser = () => {
    const [userName, setUserName] = useState(""); 
    const dispatch = useDispatch();
    const { auth } = useSelector(store => store);
   // console.log("token ",auth)

    const handleSearchUser = (e) => {
        setUserName(e.target.value);
        console.log("handleSearchUser.....---------");
        dispatch(searchUser(e.target.value));
    };

    const handleClick = (id) => {
       // console.log("handleClick id", id);
        dispatch(createChat({userId:id}))
    };

    return (
        <div>
            <div className='py-5 relative'>
                <input 
                    className='bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full' 
                    placeholder='search user...'
                    onChange={handleSearchUser}
                    type="text" 
                />

                {userName && auth.searchUser && Array.isArray(auth.searchUser) && (
                    auth.searchUser.map((item) => (
                        <Card key={item.id} className='absolute w-full z-10 top-[4.5rem] cursor-pointer'>
                            <CardHeader
                                onClick={() => {
                                    handleClick(item.id);
                                    setUserName("");
                                }}
                                avatar={<Avatar src='https://cdn.pixabay.com/photo/2019/11/11/04/33/child-4617142_1280.jpg' />}
                                title={item.firstName + " " + item.lastName}
                                subheader={item.userName}
                            />
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchUser;



// import { Avatar, Card, CardHeader } from '@mui/material';
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { searchUser } from '../../Redux/Auth/auth.action';

// const SearchUser = () => {
   

//     const [userName,setUserName]=useState(""); 
    
//     const dispatch=useDispatch();

//    // const {message}=useSelector(store=>store);
//      const {message,auth}=useSelector(store=>store);



//     const handleSearchUser=(e)=>{
//         setUserName(e.target.value)
//         console.log("handleSearchUser....._____----------",auth.searchUser);

//              dispatch(searchUser(userName))
//     }


//     const handleClick=(id)=>{
//         console. log("handleClick id",id);
//     }
//     return (
//         <div>
//             <div className='py-5 relative'>
//                 <input className='bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full' 
//                 placeholder='search user...'
//                  onChange={handleSearchUser}
//                   type="text" />

// {
//                 userName&&(                    
//             message.chats.map((item)=>
//             <Card key={item.id} className='absolute w-full z-10 top-[4.5rem] cursor-pointer'>
//             <CardHeader onClick={()=>{
//                 handleClick()
//                 setUserName("");
//             }}

            
            
//             avatar={<Avatar src='https://cdn.pixabay.com/photo/2019/11/11/04/33/child-4617142_1280.jpg'/>}
//             title={item.firstName+" "+item.lastName}
//             subheader={item.userName}
            
//             />

//         </Card>)
//            ) }

//             </div>
           
//         </div>
//     );
// };

// export default SearchUser;


// {/**  userName&&(
//             auth.searchUser.map((item)=>
//             <Card key={item.id} className='absolute w-full z-10 top-[4.5rem] cursor-pointer'>
//             <CardHeader onClick={()=>{
//                 handleClick()
//                 setUserName("");
//             }} */}