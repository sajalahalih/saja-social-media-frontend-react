import * as actionType from "./message.actionType";

const initialState = {
    messages: [],
    chats: [],
    loading: false,
    error: null,
    message: null
};

console.log("chatssssss", initialState.chats);

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CREATE_MESSAGE_SUCCESS:
            return { ...state, message: action.payload };
        case actionType.CREATE_CHAT_SUCCESS:{
            console.log("state",state)
            const chatExists =  state.chats._embedded.chatList.map(chat => chat.id === action.payload.id);
            if (!chatExists) {
            
            return { ...state, chats: [action.payload, ...state.chats._embedded.chatList] };// action.payload._embedded ? action.payload._embedded.postList : [],
        }
        }
        case actionType.GET_ALL_CHATS_SUCCESS:
            return { ...state, chats: action.payload };
        default:
            return state;
    }
};
