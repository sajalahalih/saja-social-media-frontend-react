function Login() {
    
    const onSuccess = (res) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileobj);
        }
        const onFailure = (res) => {
        console.log("LOGIN FAILED! res: ", res);
        }
        return(
        <div id="signInButton">
        {/* <GoogleLogin
         clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        /> */}
        </div>
        )
    
}

export default Login;