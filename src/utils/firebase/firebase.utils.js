import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore,  doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMMxSTak_fV_OqG6yFYtAnJRAIQ9CnCvA",
    authDomain: "crwn-clothing-6a742.firebaseapp.com",
    projectId: "crwn-clothing-6a742",
    storageBucket: "crwn-clothing-6a742.appspot.com",
    messagingSenderId: "190940208273",
    appId: "1:190940208273:web:0b05e3c9f8b9325e8fb330"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
console.log(auth);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);


// Working with FIrestore Data Base
export const db = getFirestore();
export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    // IF USER SNAPSHOT EXISTS, DO NOTHING; ELSE, CREATE THE DOCUMENT WITH THE DATA FROM USERAUTH IN THE COLLECTION
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt
            });
        } catch {
            console.log(`Error creating the user`)
        }
    }

    return userDocRef;
}

/**
 * Firebase Config allows users to make CRUD actions on firebase
 */