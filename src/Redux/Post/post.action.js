
import { CREATE_COMMENT_FAILURE, CREATE_COMMENT_REQUEST, CREATE_COMMENT_SUCCESS, CREATE_POST_FAILURE, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILURE, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_LIKED_COMMENTS_FAILURE, GET_LIKED_COMMENTS_REQUEST, GET_LIKED_COMMENTS_SUCCESS, GET_USERS_POST_FAILURE, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_COMMENT_FAILURE, LIKE_COMMENT_REQUEST, LIKE_COMMENT_SUCCESS, LIKE_POST_FAILURE, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, UPDATE_COMMENT_FAILURE, UPDATE_COMMENT_REQUEST, UPDATE_COMMENT_SUCCESS } from "./post.actionType"
import axios from "axios"
import { API_BASE_URL, api } from "../../config/api"


export const createPostAction=(postData)=>async(dispatch)=>{
   dispatch({type:CREATE_POST_REQUEST})
    try {
        const {data}=await api.post('/posts/user',postData)
        dispatch({type:CREATE_POST_SUCCESS,payload:data})
        // console.log("created post ",data)
        
    } catch (error) {
        console.log("create post error  ",error)
        dispatch({type:CREATE_POST_FAILURE,payload:error})
        
    }
};



export const getAllPostAction=()=>async(dispatch)=>{
    dispatch({type:GET_ALL_POST_REQUEST})
     try {
         const {data}=await api.get('/posts')
         dispatch({type:GET_ALL_POST_SUCCESS,payload:data})
        //  console.log("GET all post ",data)
         
     } catch (error) {
         console.log("GET ALL post error  ",error)
         dispatch({type:GET_ALL_POST_FAILURE,payload:error})
         
     }
 };

 export const getUsersPostAction=(userId)=>async(dispatch)=>{
    dispatch({type:GET_USERS_POST_REQUEST})
     try {
         const {data}=await api.get(`/posts/user/${userId}`)
         dispatch({type:GET_USERS_POST_SUCCESS,payload:data})//?????????????????????????????????????????????????????????
        //  console.log("GET USER post ",data)
         
     } catch (error) {
         console.log("GET USER post error  ",error)
         dispatch({type:GET_USERS_POST_FAILURE,payload:error})
         
     }
    };


    export const likePostAction=(postid)=>async(dispatch)=>{
       
        dispatch({type:LIKE_POST_REQUEST})
         try {
             const {data}=await api.put(`posts/like/${postid}/user`)
            //   console.log("like data ",data);
             dispatch({type:LIKE_POST_SUCCESS,payload:data})//?????????????????????????????????????????????????????????
            //  console.log("likkkkkkkkkkke post ",data)
             
         } catch (error) {
             console.log("likeeeeeeeeeeeeeeeeeee post /error  ",error)
             dispatch({type:LIKE_POST_FAILURE,payload:error})
             
         }
        };


        //------------------------COMMENT--------------------------


        export const createCommentAction=(reqData)=>async(dispatch)=>{
            dispatch({type:CREATE_COMMENT_REQUEST})
             try {
                 const {data}=await api.post(`/posts/${reqData.postId}/comments/user`,reqData.data)
                 dispatch({type:CREATE_COMMENT_SUCCESS,payload:data})
                //  console.log("created COMMENT ",data)
                 
             } catch (error) {
                 console.log("create COMMENT error  ",error)
                 dispatch({type:CREATE_COMMENT_FAILURE,payload:error})
                 
             }
         };


         
export const likeCommentAction = (commentId) => async (dispatch) => {
    dispatch({ type: LIKE_COMMENT_REQUEST });
    try {
        const {data} = await api.put(`/posts/comments/like/${commentId}/user`);
        dispatch({ type: LIKE_COMMENT_SUCCESS, payload: data });
    } catch (error) {
        console.log("likeeeeeeeeeeeeeeeeeee comment /error  ",error)
        dispatch({ type: LIKE_COMMENT_FAILURE, payload: error.message });
    }
};

// export const getLikedCommentsAction = () => async (dispatch) => {
//     dispatch({ type: GET_LIKED_COMMENTS_REQUEST });
//     try {
//       const { data } = await api.get("/posts/comments/liked");
//       dispatch({ type: GET_LIKED_COMMENTS_SUCCESS, payload: data });
//     } catch (error) {
//       console.log("get liked comments error  ", error);
//       dispatch({ type: GET_LIKED_COMMENTS_FAILURE, payload: error.message });
//     }
//   };






export const updateCommentAction = (postId,commentId,reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_COMMENT_REQUEST});

    try {
        const token = localStorage.getItem("jwt");
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.put(`${API_BASE_URL}/posts/${postId}/comments/${commentId}/user`, reqData, config);

        if (data.accessToken) {
            // Update local storage token if necessary
            localStorage.setItem("jwt", data.accessToken);
        }

        dispatch({ type: UPDATE_COMMENT_SUCCESS, payload: data.accessToken });
    } catch (error) {
        console.log("Error updating profile:", error);
        dispatch({ type: UPDATE_COMMENT_FAILURE, payload: error });
    }
};
