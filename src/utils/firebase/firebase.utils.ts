// FIREBASE
import { initializeApp } from "firebase/app";
import { getAuth, 
			signInWithRedirect, 
			signInWithPopup,
			GoogleAuthProvider,
			createUserWithEmailAndPassword,
			signInWithEmailAndPassword,
			signOut,
			onAuthStateChanged,
			User,
			NextOrObserver
	} 
from "firebase/auth";

// FIRESTORE
import { getFirestore, 
		doc, 
		getDoc, 
		setDoc, 
		collection, 
		writeBatch,
		query,
		getDocs,
		QueryDocumentSnapshot
	} 
from "firebase/firestore";
import { Category } from "../../store/categories/category.types";


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

export type ObjectToAdd = {
	title: string;
};

// **Setting and Data To Firestore
export const addCollectionAndDocumets = async <T extends ObjectToAdd> 
	(collectionKey: string, objectsToAdd: T[]): Promise<void> => {
		const collectionRef = collection(db, collectionKey);
		const batch = writeBatch(db);

		objectsToAdd.forEach(object => {
				const docRef = doc(collectionRef, object.title.toLowerCase());
				batch.set(docRef, object);
		})

		await batch.commit();
};

// **Retrieving Data From Firestore
export const getCollectionAndDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, "categories");
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};

export type OtherInfo = {
	displayName?: string;
};

export type UserData = {
	createdAt: Date;
	displayName: string;
	email: string;
};

export const createUserDocFromAuth = async (
	userAuth: User, otherInfo?: OtherInfo
): Promise<void | QueryDocumentSnapshot<UserData>> => {
	const userDocRef = doc(db, "users", userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	// if user data does not exist, create/set the document with the data from userAuth in my collection
	if (!userSnapshot.exists()) {
			const { displayName, email } = userAuth;
			const createdAt = new Date();

			try {
					await setDoc(userDocRef, {
							displayName,
							email,
							createdAt,
							...otherInfo
					});
			} catch(error) {
					console.log("error creating the user: ", error);
			}
	}
    
	// if user exists, just return userSnaphot
	return userSnapshot as QueryDocumentSnapshot<UserData>;
}

export const createAuthUserWithEmailAndPassword = async(email: string, password: string) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async(email: string, password: string) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => 
	onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
	return new Promise((resolve, reject) => {
		// the method receives the auth and a callback that returns the userAuth
		const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject
	);
	});
};