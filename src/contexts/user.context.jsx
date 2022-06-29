import { createContext, useState, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocFromAuth } from "../utils/firebase/firebase.utils";

// The actual value I want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER" 
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {...state, currentUser: payload};
    default:
      throw new Error(`Unhandled type ${type} is userReducer`);
  };
};

const INITIAL_STATE = {currentUser: null};

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state; 
  const setCurrentUser = (user) => {
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
  }

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

/*
const userReducer = (state, action) => {
    return {
        currentUser: null;
    }
}


*/



/*
const userReducer = (state, action) => {
  const { type, payload } = action;

  switch(type) {
    case "update_user":
      return {...state, currentUser: payload};
    default:
      throw new Error("Wrong assignment");
  }
}

const initialState = {currentUser: null};

const userProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { currentUser } = state;

  const setCurrentUser = (user) => {
    dispatch({type: "updateUser", payload: user});
  }
}

const value = {currentUser, setCurrentUser};

return <UserContext.Provider value={value}> {children} </UserContext.Provider>




*/