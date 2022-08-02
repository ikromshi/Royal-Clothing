import { AnyAction } from "redux";
import { UserData } from "../../utils/firebase/firebase.utils";
import { USER_ACTION_TYPES } from "./user.types";

export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null, 
  isLoading: false,
  error: null
};

export const userReducer = (state=INITIAL_STATE, action: AnyAction) => {

  switch(action.type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {...state, currentUser: action.payload};
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {...state, currentUser: null};
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return {...state, error: action.payload};
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
    case USER_ACTION_TYPES.SIGN_UP_FAILED:
    default:
      return state;
  };
};

/**
 * every single reducer receives every single action with redux, so the previous state
 * needs to be returned if the action type doesn't match
 */