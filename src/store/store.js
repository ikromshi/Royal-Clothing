import { persistStore, persistReducer } from "redux-persist";
import { legacy_createStore as createStore } from "redux";
import { compose, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import { logger } from "redux-logger";

// [2 === 3 && {a: "str"}].filter(Boolean) -> []
// [3 === 3 && {a: "str"}].filter(Boolean) -> [{a: "str"}]
const middleWares = [process.env.NODE_ENV === "development" && logger].filter(Boolean);
// enable the logger only in development mode

// enable redux devtools only when the app is in developmentxs
const composeEnhacer = (
  process.env.NODE_ENV === "development" && 
  window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
  compose;
const composedEnhancers = composeEnhacer(applyMiddleware(...middleWares));

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"]  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);