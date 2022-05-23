import { auth, signInWithGooglePopup, createUserDocFromAuth, signInWithGoogleRedirect } from "../../../utils/firebase/firebase.utils";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

const SignIn = () => {
    useEffect(() => {
        async function log() {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocFromAuth(response.user);
            }
        }
        log();
    }, []);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    }

    return (
        <div>
            <h1>Sign-in Page</h1>
            <button onClick={logGoogleUser}>Sign-in with Google Pop-up</button>
            <button onClick={signInWithGoogleRedirect}>Sign-in with Google Redirect</button>
        </div>
    )
}

export default SignIn;