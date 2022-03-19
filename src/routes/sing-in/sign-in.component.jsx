import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth"; // both are used, so that the page doesn;t unmount when redirected

import {
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect, 
    createUserDocFromAuth 
} from "../../utils/firebase/firebase.utils";  

const SignIn = () => {
    useEffect(async () => {
        const response = await getRedirectResult(auth);
        if (response) {
            createUserDocFromAuth(response.user);
        }
    }, [])

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
            <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button>
        </div>
    )
}

export { SignIn as default };