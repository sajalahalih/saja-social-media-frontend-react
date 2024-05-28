
import { GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEARCH_USER_SUCCESS, UPDATE_PROFILE_SUCCESS } from "./auth.actionType";

const initialState={

    jwt:null,//or accessToken ?????????????????????
    error:null,
    loading:false,
    user:null,   
   searchUser:[]
}

export const authReducer=(state=initialState,action)=>{

    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case GET_PROFILE_REQUEST:    
            return{...state,loading:true, error:null}

        case GET_PROFILE_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return {...state, user:action.payload,error:null,loading:false}
          
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return{...state,jwt:action.payload,loading:false,error:null}    

        case SEARCH_USER_SUCCESS:
            console.log("Reducer SEARCH_USER__SUCCESS payload:", action.payload); // Debug statement
          
          //  return {...state,searchUser:action.payload,loading:false,error:null}    
          const userList = action.payload._embedded?.userList || []; // Extract userList safely
          return { ...state, searchUser: userList, loading: false, error: null };
      
    
        case LOGIN_FAILURE:
        case REGISTER_FAILURE:
                return {...state,loading:false,error:action.payload}

        case LOGOUT:
                return { ...state, jwt: null, user: null, loading: false, error: null };


                // case LOGOUT:
                //     return { ...initialState };
              
        default:
           return state;
    }
}