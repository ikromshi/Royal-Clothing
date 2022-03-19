import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";  

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
        </div>
    )
}

export { SignIn as default };