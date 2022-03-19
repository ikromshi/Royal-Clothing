import {
    signInWithGooglePopup, 
    createUserDocFromAuth 
} from "../../utils/firebase/firebase.utils";  
import SignUpForm from "../../components/sign-up-form/sign-up-form.component"

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(response.user);
    } 

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Pop up
            </button>
            <SignUpForm />
        </div>
    )
}

export { SignIn as default };