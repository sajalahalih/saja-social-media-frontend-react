import { api } from "../../config/api";
import * as actionType from "./message.actionType";

export const createMessage = (message) => async (dispatch) => {
    console.log("message on create message",message)
    dispatch({ type: actionType.CREATE_MESSAGE_REQUEST });
    try {
        const { data } = await api.post(`/chats/${message.chatId}/messages/user`, message);//?????????????
        console.log("created message", data);
        dispatch({ type: actionType.CREATE_MESSAGE_SUCCESS, payload: data });
    } catch (error) {
        console.log("error on create message", error);
        dispatch({ type: actionType.CREATE_MESSAGE_FAILURE, payload: error });
    }
};

export const createChat = (chat) => async (dispatch) => {
    console.log("chat",chat)
    dispatch({ type: actionType.CREATE_CHAT_REQUEST });
    try {
        const { data } = await api.post(`/chats/create`, chat);
        console.log("created chat", data);
        dispatch({ type: actionType.CREATE_CHAT_SUCCESS, payload: data });
    } catch (error) {
        console.log("error on create chat", error);
        dispatch({ type: actionType.CREATE_CHAT_FAILURE, payload: error });
    }
};



export const getAllChats = () => async (dispatch) => {
    dispatch({ type: actionType.GET_ALL_CHATS_REQUEST });
    try {
        const { data } = await api.get(`/chats/user`);//message was here and as param
        console.log("get all chats", data);
        dispatch({ type: actionType.GET_ALL_CHATS_SUCCESS, payload: data });
    } catch (error) {
        console.log("error on get all chats", error);
        dispatch({ type: actionType.GET_ALL_CHATS_FAILURE, payload: error });
    }
};
