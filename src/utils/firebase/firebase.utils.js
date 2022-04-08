import { initializeApp } from "firebase/app";
import { getFirestore,  doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth,  
        signInWithPopup, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword
} from "firebase/auth";


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
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


// Working with FIrestore Database
export const db = getFirestore();

/**
 * 
 * @param {userData} userAuth userData that gets created when user signs-up with email/signs-up with pop-up
 * @param {displayName} additionalInfo  displayName that's passed when user is created with email sign-up, 
 * which would normally have a value in sign-in with google pop-up
 * @returns userDocRef
 */
export const createUserDocFromAuth = async (userAuth, additionalInfo={}) => {
    if (!userAuth) return;
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
                createdAt,
                ...additionalInfo
            });
        } catch {
            console.log(`Error creating the user`)
        }
    }

    return userDocRef;
}


/**
 * PURPOSE: stores userInfo on FIREBASE AUTH page as users sign up
 * @param {emailAddress} email email address provided by the user in the form 
 * @param {password} password password provided by the user to the password
 * @returns 
 */
export const createAuthUserWithEmailAndPwrd = async(email, password) => {
    if (!email || !password) return;

    return createUserWithEmailAndPassword(auth, email, password);
}


export const signInAuthUserWithEmailAndPwrd = async(email, password) => {
    if (!email || !password) return;

    return signInWithEmailAndPassword(auth, email, password);
}
/**
 * Firebase Config allows users to make CRUD actions on firebase
 */