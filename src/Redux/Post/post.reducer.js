import { CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, LIKE_COMMENT_FAILURE, LIKE_COMMENT_REQUEST, LIKE_COMMENT_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, UPDATE_COMMENT_FAILURE, UPDATE_COMMENT_SUCCESS } from "./post.actionType";

const initialState={
    post:null,
    loading:false,
    error:null,
    posts:[],
    liked:null,
    comments:[],
    newComment:null,
    liked:null


};

export const postReducer=(state=initialState, action)=>{
    // console.log('Reducer called with action:', action);
    // console.log('Current state:', state);

    switch (action.type) {
        case CREATE_POST_REQUEST:
        case GET_ALL_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case LIKE_COMMENT_REQUEST:
            
             return {...state, error:null, loading:false};
             
             
        case CREATE_POST_SUCCESS:                  
            return {...state,
                        post:action.payload,
                        posts: [action.payload, ...state.posts],
                        loading:false,
                        error:null};

        case GET_ALL_POST_SUCCESS:
            return {...state,
                posts: action.payload._embedded ? action.payload._embedded.postList : [],
               
               // posts: action.payload, // Fix: Ensure posts is an array
                comments: action.payload.comments ,
                loading:false,
                error:null
            };


            case LIKE_COMMENT_SUCCESS://???????????????????????????????????????????????????????????????????
               
    return { ...state, 
        liked:action.payload,
       // comments: state.comments.map(item => item.id === action.payload.id ? action.payload : item),
       comments: Array.isArray(state.comments) ? 
       state.comments.map(item => item.id === action.payload.id ? action.payload : item) : 
       [], 
       loading:false,
        error:null };
       
        case LIKE_POST_SUCCESS:
            return{
                ...state,
                liked:action.payload,
            //    posts:state.posts.map((item)=>item.id===action.
            //     payload.id?action.payload:item),
              //  posts: state.posts.map((item) => item.id === action.payload.id ? action.payload : item),
              posts: state.posts.map(item => item.id === action.payload.id ? action.payload : item),
              
                loading:false,
                error:null
            };
        case CREATE_COMMENT_SUCCESS:
            return{
                ...state,
                newComment:action.payload,
               // comments:[action.payload,...state.comments],
                loading:false,
                error:null
            }

            case UPDATE_COMMENT_SUCCESS:
                return {
                    ...state,
                    // comments: state.comments.map(comment =>
                    //     comment.id === action.payload.id ? action.payload : comment
                    //   ),
                    // comments: Array.isArray(state.comments) ? 
                    // state.comments.map(item => item.id === action.payload.id ? action.payload : item) : 
                    // [], 
                     newComment:action.payload,
                    //comments: action.payload.comments ,
                    loading: false,
                    error: null
                };
                case UPDATE_COMMENT_FAILURE:
                    return {
                      ...state,
                      loading: false,
                      error: action.payload,
                    };
            
            
        case CREATE_POST_FAILURE:
        case GET_ALL_POST_FAILURE:
        case LIKE_POST_FAILURE:
        case LIKE_COMMENT_FAILURE:
                            
            return {...state, error:action.payload, loading:false};
                    
            
    
        default:
            return state;
    }

}