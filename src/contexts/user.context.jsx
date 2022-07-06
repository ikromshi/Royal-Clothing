import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocFromAuth } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

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
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unscubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      };
      setCurrentUser(user);
    });
    {/**unsubscribe is returned when the app unmounts to stop onAuthStateChanged listener from listening forever */}
    return unscubscribe; {/**useEffect() will run whatever it returns from the callback when it unmounts */}
  }, [])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};