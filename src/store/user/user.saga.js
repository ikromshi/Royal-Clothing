import { getCurrentUser } from "../../utils/firebase/firebase.utils";
import { takeLatest, put, all, call } from "redux-saga/effects";
import { signInSuccess, signInFailed,  } from "./user.action";
import { USER_ACTION_TYPES } from "./user.types";

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
         
  } catch (error) {

  };
};


export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, );
};

export function* userSaga() {
  yield all([]); 
};