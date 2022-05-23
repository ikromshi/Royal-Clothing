// FIREBASE
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup,GoogleAuthProvider } from "firebase/auth";

// FIRESTORE
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


// **FIRESTORE

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTKMS1iLA5y05sNyZOop0eaboiYtEDJvU",
    authDomain: "crwn-clothing-ikromshi.firebaseapp.com",
    projectId: "crwn-clothing-ikromshi",
    storageBucket: "crwn-clothing-ikromshi.appspot.com",
    messagingSenderId: "90980046586",
    appId: "1:90980046586:web:1fab2f96bd6568a6389b43"
  };
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
  
// **FIREBASE
export const db = getFirestore();
export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, "users", userAuth.uid);
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists());


    // if user data does not exist, create/set the document with the data from userAuth in my collection
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error) {
            console.log("error creating the user: ", error.message);
        }
    }
    
    // if user exists, just return userDocRef
    return userDocRef;
}