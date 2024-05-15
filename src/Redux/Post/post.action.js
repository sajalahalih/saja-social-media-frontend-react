import { api } from "../../config/api"
import { CREATE_POST_FAILUER, CREATE_POST_REQUEST, CREATE_POST_SUCCESS, GET_ALL_POST_FAILUER, GET_ALL_POST_REQUEST, GET_ALL_POST_SUCCESS, GET_USERS_POST_FAILUER, GET_USERS_POST_REQUEST, GET_USERS_POST_SUCCESS, LIKE_POST_FAILUER, LIKE_POST_REQUEST, LIKE_POST_SUCCESS } from "./post.actionType"

export const createPostAction=(postData)=>async(dispatch)=>{
   dispatch({type:CREATE_POST_REQUEST})
    try {
        const {data}=await api.post('/posts/user',postData)
        dispatch({type:CREATE_POST_SUCCESS,payload:data})//?????????????????????????????????????????????????????????
        console.log("created post ",data)
        
    } catch (error) {
        console.log("create post error  ",error)
        dispatch({type:CREATE_POST_FAILUER,payload:"error"})
        
    }
}



export const getAllPostAction=()=>async(dispatch)=>{
    dispatch({type:GET_ALL_POST_REQUEST})
     try {
         const {data}=await api.get('/posts')
         dispatch({type:GET_ALL_POST_SUCCESS,payload:data})//?????????????????????????????????????????????????????????
         console.log("GET post ",data)
         
     } catch (error) {
         console.log("GET ALL post error  ",error)
         dispatch({type:GET_ALL_POST_FAILUER,payload:"error"})
         
     }
 }

 export const getUsersPostAction=(userId)=>async(dispatch)=>{
    dispatch({type:GET_USERS_POST_REQUEST})
     try {
         const {data}=await api.get(`/posts/user/${userId}`)
         dispatch({type:GET_USERS_POST_SUCCESS,payload:data})//?????????????????????????????????????????????????????????
         console.log("GET USER post ",data)
         
     } catch (error) {
         console.log("GET USER post error  ",error)
         dispatch({type:GET_USERS_POST_FAILUER,payload:"error"})
         
     }
    }


    export const likePostAction=(postid)=>async(dispatch)=>{
        dispatch({type:LIKE_POST_REQUEST})
         try {
             const {data}=await api.get(`posts/like/${postid}/user`)
             dispatch({type:LIKE_POST_SUCCESS,payload:data})//?????????????????????????????????????????????????????????
             console.log("like post ",data)
             
         } catch (error) {
             console.log("like post /error  ",error)
             dispatch({type:LIKE_POST_FAILUER,payload:"error"})
             
         }
        }