import { categoriesSaga } from "./categories/category.saga";
import { all, call } from "typed-redux-saga";
import { userSaga } from "./user/user.saga";

export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSaga)]);
};