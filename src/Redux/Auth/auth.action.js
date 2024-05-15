import axios from "axios"
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType"
import { API_BASE_URL, api } from "../../config/api"
import { Api } from "@mui/icons-material"



export const loginUserAction=(loginData)=>async(dispatch)=>{
    
    dispatch({type:LOGIN_REQUEST})
    try{
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data); 

        if(data.accessToken){
            localStorage.setItem("jwt",data.accessToken)

  console.log("login jwttttttttttttttt",data.accessToken)
        }

        console.log("loginnnnnnnnnnn",data)

        dispatch({type:LOGIN_SUCCESS,payload:data.accessToken})
    }catch(error){
        console.log("--------------",error)

        dispatch({type:LOGIN_FAILURE,payload:error})
    }
}


export const registerUserAction = (registerData) => async (dispatch) => {
    
    dispatch({ type: LOGIN_REQUEST});
    try{
        const { data } = await axios.post(
            `${API_BASE_URL}/auth/signup`,
            registerData.data
            ); 

        if(data.accessToken){
            localStorage.setItem("jwt",data.accessToken);

        }

        console.log("register------------",data);

        dispatch({type:LOGIN_SUCCESS,payload:data.accessToken});
    }catch(error){
        console.log("--------------",error);

        dispatch({type:LOGIN_FAILURE,payload:error});
    }
};



export const updateProfileAction=(reqData)=>async(dispatch)=>{
    
    dispatch({type:UPDATE_PROFILE_REQUEST})
    try{//put insted of post 
        const { data } = await api.put(`${API_BASE_URL}/users`, //on the backend itt users/{id}
        reqData
        ); 

        if(data.accessToken){
            localStorage.setItem("jwt",data.accessToken)

        }

        console.log("UPDATE PROFILE------------",data)

        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.accessToken})
    }catch(error){
        console.log("--------------",error)

        dispatch({type:UPDATE_PROFILE_FAILURE,payload:error})
    }
}



export const getProfileAction=(accessToken)=>async(dispatch)=>{  
    
    dispatch({type:GET_PROFILE_REQUEST})
    try{
        const { data } = await axios.get(
            `${API_BASE_URL}/users/profile`, 
           { headers:{
                Authorization:`Bearer ${accessToken}`
            },
           }
        ); 

        

        console.log("profile------------",data)

        dispatch({type:GET_PROFILE_SUCCESS,payload:data })
    }catch(error){
        console.log("--------------",error)

        dispatch({type:GET_PROFILE_FAILURE,payload:error})
    }
}