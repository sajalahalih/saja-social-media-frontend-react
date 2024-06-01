import axios from "axios"
import { GET_PROFILE_FAILURE, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, SEARCH_USER_REQUEST, SEARCH_USER_FAILURE, SEARCH_USER_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "./auth.actionType"
import { API_BASE_URL, api } from "../../config/api"
import { Api } from "@mui/icons-material"



// export const loginUserAction=(loginData)=>async(dispatch)=>{
    
//     dispatch({type:LOGIN_REQUEST})
//     try{
//         const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data); 

//         if(data.accessToken){
//             localStorage.setItem("jwt",data.accessToken)

// //   console.log("login jwttttttttttttttt",data.accessToken)
//         }

//         // console.log("loginnnnnnnnnnn",data)

//         dispatch({type:LOGIN_SUCCESS,payload:data.accessToken})
//     }catch(error){
//         console.log("--------------",error)

//         dispatch({type:LOGIN_FAILURE,payload:error})
//     }
// }
export const loginUserFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
  });
  
  export const loginUserAction = (loginData) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signin`, loginData.data);
        if (data.accessToken) {
            localStorage.setItem("jwt", data.accessToken);
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.accessToken });
    } catch (error) {
        // Check if the error response contains specific error messages
        if (error.response && error.response.data && error.response.data.message) {
            const errorMessage = error.response.data.message;
            if (errorMessage === 'Incorrect username or password') {
                dispatch(loginUserFailure(errorMessage)); // Dispatch custom error message
            } else {
                dispatch(loginUserFailure('Incorrect username or password')); // Dispatch generic error message
            }
        } else {
            dispatch(loginUserFailure('Incorrect username or password')); // Dispatch generic error message
        }
    }
};

// export const registerUserAction = (registerData) => async (dispatch) => {
    
//     dispatch({ type: LOGIN_REQUEST});
//     try{
//         const { data } = await axios.post(
//             `${API_BASE_URL}/auth/signup`,
//             registerData.data
//             ); 

//         if(data.accessToken){
//             localStorage.setItem("jwt",data.accessToken);

//         }

//         // console.log("register------------",data);

//         dispatch({type:LOGIN_SUCCESS,payload:data.accessToken});
//     }catch(error){
//         console.log("--------------",error);

//         dispatch({type:LOGIN_FAILURE,payload:error});
//     }
// };

// auth.actions.js


export const registerUserAction = (registerData) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, registerData.data);
        if (data.accessToken) {
            localStorage.setItem("jwt", data.accessToken);
        }
        dispatch({ type: REGISTER_SUCCESS, payload: data.accessToken });
    } catch (error) {
        console.log("--------------", error);
        const errorMessage = error.response && error.response.data && error.response.data.message 
            ? error.response.data.message 
            : "Registration failed. Please fill all the fileds.";
        dispatch({ type: REGISTER_FAILURE, payload: errorMessage }); // Dispatch failure with error message
    }
};
// updateProfileAction function
export const updateProfileAction = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    try {
        const token = localStorage.getItem("jwt");
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };

        const { data } = await axios.put(`${API_BASE_URL}/users`, reqData, config);

        if (data.accessToken) {
            // Update local storage token if necessary
            localStorage.setItem("jwt", data.accessToken);
        }

        dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.accessToken });
    } catch (error) {
        console.log("Error updating profile:", error);
        dispatch({ type: UPDATE_PROFILE_FAILURE, payload: error });
    }
};


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





export const searchUser=(query)=>async(dispatch)=>{  
    
    dispatch({type:SEARCH_USER_REQUEST})
    try{
        const { data } = await api.get(`/users/search?query=${query}`)
               

        console.log("search user------------",data)

        dispatch({type:SEARCH_USER_SUCCESS,payload:data })
    }catch(error){
        console.log("search user--------------",error)

        dispatch({type:SEARCH_USER_FAILURE,payload:error})
    }
}


// auth.actions.js
export const LOGOUT = "LOGOUT";

export const logoutUserAction = () => (dispatch) => {
  localStorage.removeItem("jwt");
  dispatch({ type: LOGOUT });
};



