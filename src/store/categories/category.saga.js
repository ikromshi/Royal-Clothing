import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { getCollectionAndDocuments } from "../../utils/firebase/firebase.utils";
import { takeLatest, all, call, put } from "redux-saga/effects";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

// Generator functions in categoriesSaga;
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield call(getCollectionAndDocuments);
    yield put(fetchCategoriesSuccess(categoriesArray)); // put() = dispatch();
  } catch(error) {
    yield put(fetchCategoriesFailed(error));
  };
};

/**
 * Listens to each action dispatched to the store and runs the generator
 * function (fetchCategoriesAsync()) when the pattern (1st param) matches
 * the type of the action 
*/
export function* onFetchCategories() {
  yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
};

export function* categoriesSaga() {
  yield all([call(onFetchCategories)]) // don't proceed untill all the items in the list are complete
};