import { auth, signInWithGooglePopup, createUserDocFromAuth, signInWithGoogleRedirect } from "../../../utils/firebase/firebase.utils";
import SignUpForm from "../../sign-up-form/sign-up-form.component"; 

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    }

    return (
        <div>
            <h1>Sign-in Page</h1>
            <button onClick={logGoogleUser}>Sign-in with Google Pop-up</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;