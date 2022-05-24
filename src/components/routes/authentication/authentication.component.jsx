import { auth, signInWithGooglePopup, createUserDocFromAuth, signInWithGoogleRedirect } from "../../../utils/firebase/firebase.utils";
import SignUpForm from "../../sign-up-form/sign-up-form.component"; 
import SignInForm from "../../sign-in-form/sign-in-form.component";

const Authentication = () => {
    return (
        <div>
            <h1>Sign-in Page</h1>
            <SignInForm />
            {/* <button onClick={logGoogleUser}>Sign-in with Google Pop-up</button> */}
            <SignUpForm />
        </div>
    )
}

export default Authentication;