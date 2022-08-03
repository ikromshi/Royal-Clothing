import { getCurrentUser, 
        createUserDocFromAuth, 
        signInWithGooglePopup, 
        signInAuthUserWithEmailAndPassword,
        createAuthUserWithEmailAndPassword,
        signOutUser,
        OtherInfo
} from "../../utils/firebase/firebase.utils";
import { signInSuccess, 
        signInFailed, 
        signUpSuccess, 
        signUpFailed, 
        signOutFailed, 
        signOutSuccess
} from "./user.action";
import { takeLatest, put, all, call } from "typed-redux-saga/macro";
import { USER_ACTION_TYPES } from "./user.types";
import { User } from "firebase/auth";
import { ActionWithPaylaod } from "../../utils/reducer/reducer.utils";


export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: OtherInfo) {
  try {
    const userSnapshot = yield* call(createUserDocFromAuth, userAuth, additionalDetails);
    if (userSnapshot) {
      yield* put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    };
  } catch(error) {
    yield* put(signInFailed(error as Error));
  }
};


export function* signInWithGoogle() {
  try{
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch(error) {
    yield* put(signInFailed(error as Error)); 
  };
};

type SignInWithEmail = ActionWithPaylaod<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email: string, password: string}>;

export function* signInWithEmail({ payload: { email, password }}: SignInWithEmail) {
  try {
    const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password);
    if (userCredential) {
      const { user } = userCredential;
      yield* call(getSnapshotFromUserAuth, user);
    }
  } catch(error) {
    yield* put(signInFailed(error as Error));
  };
};


export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
      yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
      yield* put(signInFailed(error as Error));
  };
};

type SignUp = ActionWithPaylaod<USER_ACTION_TYPES.SIGN_UP_START, { email: string; password: string; displayName: string }>;

export function* signUp({ payload: { email, password, displayName }}: SignUp) {
  try {
    const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password);
    if (userCredential) {
      const { user } = userCredential;
      yield* put(signUpSuccess(user, { displayName, password }));
    }
  } catch(error) {
    yield* put(signUpFailed(error as Error));
  }
};


export function* signOut() {
  try {
    yield* call(signOutUser);
    yield* put(signOutSuccess());
  } catch(error) {
    yield* put(signOutFailed(error as Error));
  }
};

type SingUpSuccess = ActionWithPaylaod<USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user: User, additionalDetails: OtherInfo}>

export function* signInAfterSignUp({ payload: { user, additionalDetails }}: SingUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
};

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
};

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
};

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
};

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp);
};

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
};

export function* onSignOutStart() {
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
};

export function* userSaga() {
  yield* all([
    call(onCheckUserSession), 
    call(onGoogleSignInStart), 
    call(onEmailSignInStart),
    call(onSignUpSuccess),
    call(onSignUpStart),
    call(onSignOutStart)
  ]); 
};