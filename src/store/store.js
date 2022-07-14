import { persistStore, persistReducer } from "redux-persist";
import { legacy_createStore as createStore } from "redux";
import { compose, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./root-reducer";
import { logger } from "redux-logger";

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user"]  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, undefined, composedEnhancers);
export const persistor = persistStore(store);