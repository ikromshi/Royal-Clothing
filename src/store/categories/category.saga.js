import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils";
import { takeLatest, all, call, put } from "redux-saga/effects";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

// Generator functions in categoriesSaga;
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCollectionAndDocuments);
    console.log("FETCHING CATEGORIES")
    yield put(fetchCategoriesSuccess(categoriesArray)); // put() = dispatch();
  } catch(error) {
    yield put(fetchCategoriesFailed(error));
  };
};

export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
};

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]) // don't proceed untill all the items in the list are complete
};