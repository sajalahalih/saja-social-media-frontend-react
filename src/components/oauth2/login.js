
import {GoogleLogin } from "react-google-login";

const clientId="253013366460-phc42gjl56imtidp8uslmqfoh1ljrc73.apps.googleusercontent.com";

function Login() {
    
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileobj);
        }
        const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
        }
        return(
        <div id="signInButton">
        <GoogleLogin
         clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        />
        </div>
        )
    
}

export default Login;