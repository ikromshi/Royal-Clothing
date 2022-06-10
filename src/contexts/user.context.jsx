import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocFromAuth } from "../utils/firebase/firebase.utils";

// The actual value I want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
})

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    useEffect(() => {
        const unscubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        });
        {/**unsubscribe is returned when the app unmounts to stop onAuthStateChanged listener from listening forever */}
        return unscubscribe; {/**useEffect() will run whatever it returns from the callback when it unmounts */}
    }, [])
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

















// /**
//  * Context - smth like a component that wraps around other components that need access to it
//  *  - a storage place
//  */

// import { createContext } from "react";

// // The actual value I want to access
// export const UserContext = createContext({

// })

// export const UserProvider = ({ children }) => {
//     return <UserContext.Provider>{children}</UserContext.Provider>
// }

// /**
//  * .Proveder => component that will wrap around any other components that need access to 
//  * the values inside of UserContext
//  */