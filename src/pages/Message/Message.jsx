import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Backdrop, CircularProgress, Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone';
import SockJS from 'sockjs-client';
import Stomp from "stompjs";
import { useNavigate } from 'react-router-dom';
import SearchUser from '../../components/SearchUser/SearchUser';
import UserChatCard from './UserChatCard';
import ChatMessage from './ChatMessage';
import { createMessage, getAllChats, createChat } from '../../Redux/Message/message.action';
import { uplodeToCloudinary } from '../../utils/uplodeToCloudniry';
import './Message.css';

const Message = () => {
    const { auth, message } = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const chatContainerRef = useRef(null);
    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        dispatch(getAllChats());
    }, [dispatch]);

    useEffect(() => {
        const sock = new SockJS("http://localhost:8080/ws");
        const stomp = Stomp.over(sock);
        setStompClient(stomp);

        stomp.connect({}, onConnect, onErr);
    }, []);

    const onConnect = () => {
        console.log("WebSocket connected...");
    }

    const onErr = (error) => {
        console.log("WebSocket error:", error);
    }

    const onMessageReceive = (payload) => {
        const receivedMessage = JSON.parse(payload.body);
        console.log("Message received from WebSocket:", receivedMessage);
        setMessages(prevMessages => [...prevMessages, receivedMessage]);
    }

    useEffect(() => {
        if (stompClient && auth.user && currentChat) {
            console.log("Subscribing to:", `/user/${currentChat.id}/private`);
            const subscription = stompClient.subscribe(`/user/${currentChat.id}/private`, onMessageReceive);
            return () => subscription.unsubscribe();
        }
    }, [stompClient, auth.user, currentChat]);

    const sendMessageToServer = (newMessage) => {
        if (stompClient && newMessage) {
            stompClient.send(`/app/chat/${currentChat?.id.toString()}`, {}, JSON.stringify(newMessage));
        }
    }

    const handleSelectImage = async (e) => {
        setLoading(true);
        const imgUrl = await uplodeToCloudinary(e.target.files[0], "image");
        setSelectedImage(imgUrl);
        setLoading(false);
    };

    const handleCreateMessage = (value) => {
        const newMessage = {
            chatId: currentChat?.id,
            content: value || " ",
            image: selectedImage,
        };
        dispatch(createMessage({ newMessage, sendMessageToServer }));
        setInputValue('');
        setSelectedImage(null);
    };

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const chatList = Array.isArray(message.chats)
        ? message.chats
        : message.chats?._embedded?.chatList || [];

    return (
        <div>
            <Grid container className='h-screen overflow-y-hidden'>
                <Grid className='px-5' item xs={4} lg={3}>
                    <div className='flex h-full justify-between space-x-2'>
                        <div className='w-full'>
                            <div className='flex space-x-4 items-center py-5'>
                                <ArrowBackIcon onClick={() => navigate("/home")} />
                                <h1 className='text-xl font-bold'>Home</h1>
                            </div>
                            <div className='h-[83vh]'>
                                <div className=''>
                                    <SearchUser />
                                </div>
                                <div className='h-full space-y-4 mt-5 overflow-y-scroll hideScrollbar'>
                                    {
                                        chatList.map((item) => (
                                            <div key={item.id} onClick={() => {
                                                setCurrentChat(item);
                                                setMessages(item.messages);
                                            }}>
                                                <UserChatCard chat={item} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid className='h-full' item xs={8} lg={9}>
                    {currentChat ? (
                        <div>
                            <div className='flex justify-between items-center border-l p-5'>
                                <div className='flex items-center space-x-3'>
                                    <Avatar src='https://cdn.pixabay.com/photo/2021/04/17/15/44/eye-6186141_640.jpg' />
                                    <p className=''>
                                        {auth.user.id === currentChat.users[0].id
                                            ? `${currentChat.users[1].firstName} ${currentChat.users[1].lastName}`
                                            : `${currentChat.users[0].firstName} ${currentChat.users[0].lastName}`}
                                    </p>
                                </div>
                                <div className='flex space-x-3'>
                                    <IconButton>
                                        <AddIcCallIcon />
                                    </IconButton>
                                    <IconButton>
                                        <VideoCallIcon />
                                    </IconButton>
                                </div>
                            </div>
                            <div ref={chatContainerRef} className='hideScrollbar overflow-y-scroll h-[82vh] px-3 space-y-5 py-12'>
                                {Array.isArray(messages) && messages.map((item, index) => (
                                    <ChatMessage key={index} item={item} />
                                ))}
                            </div>
                            <div className='sticky bottom-0 border-l'>
                                {selectedImage && <img className='w-[5rem] h-[5rem] object-cover px-2' src={selectedImage} alt="" />}
                                <div className='py-5 flex items-center justify-center space-x-5'>
                                    <input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter" && e.target.value) {
                                                handleCreateMessage(e.target.value);
                                            }
                                        }}
                                        className="bg-transparent border border-[#3b40544] rounded-full w-[90%] py-3 px-5"
                                        placeholder='Message...'
                                        type='text'
                                    />
                                    <div>
                                        <input type="file" accept='image/*' onChange={handleSelectImage} className='hidden' id='image-input' />
                                        <label htmlFor="image-input">
                                            <AddPhotoAlternateIcon />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='h-full space-y-5 flex flex-col justify-center items-center'>
                            <ContactSupportTwoToneIcon sx={{ fontSize: "15rem" }} />
                            <p className='text-xl font-semibold'>No Chat Selected</p>
                        </div>
                    )}
                </Grid>
            </Grid>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
};

export default Message;
