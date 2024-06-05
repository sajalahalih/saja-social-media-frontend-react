import * as actionType from "./message.actionType";

const initialState = {
    messages: [],
    chats: [],
    loading: false,
    error: null,
    message: null
};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.CREATE_MESSAGE_SUCCESS:
            return { ...state, message: action.payload };

        case actionType.CREATE_CHAT_SUCCESS:
            const newChat = action.payload;
            const existingChats = state.chats?._embedded?.chatList || state.chats || [];
            const chatExists = existingChats.some(chat => chat.id === newChat.id);
            if (!chatExists) {
                return { ...state, chats: [...existingChats, newChat] };
            }
            return state;

        case actionType.GET_ALL_CHATS_SUCCESS:
            return { ...state, chats: action.payload };

        default:
            return state;
    }
};
