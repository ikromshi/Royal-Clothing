import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup,GoogleAuthProvider } from "firebase/auth";
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

  

