import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

/**
 * Firebase Config allows users to make CRUD actions on firebase
 */