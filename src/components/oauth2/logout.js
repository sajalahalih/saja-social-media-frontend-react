import { GoogleLogout } from 'react-google-login';

const clientId="253013366460-phc42gjl56imtidp8uslmqfoh1ljrc73.apps.googleusercontent.com";



function Logout() {
const onSuccess = () => {
console.log("Log out successfull!");
}
return (
<div id="signOutButton">
<GoogleLogout
clientId={clientId}
buttonText={"Logout"}
on LogoutSuccess={onSuccess}
/>
</div>
)
}
export default Logout;

