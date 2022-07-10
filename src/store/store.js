import { legacy_createStore as createStore } from "redux";
import { compose, applyMiddleware } from "redux";
import { rootReducer } from "./root-reducer";
import { logger } from "redux-logger";

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);