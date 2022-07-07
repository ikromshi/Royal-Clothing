export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER" 
};

const INITIAL_STATE = {currentUser: null};

export const userReducer = (state=INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch(type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {...state, currentUser: payload};
    default:
      return state;
  };
};

/**
 * every single reducer receives every single action with redux, so the previous state
 * needs to be returned if the action type doesn't match
 */