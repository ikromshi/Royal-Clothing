import { AnyAction } from "redux";
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from "./category.action";
import { Category } from "./category.types";

export type CategoryState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null;
};

const INITIAL_STATE: CategoryState = {
  categories: [],
  isLoading: false, // is data in the loading stage with redux thunk?
  error: null // potential error in the fetching process of the async function
};

export const categoriesReducer = (state=INITIAL_STATE, action={} as AnyAction) => {

  if (fetchCategoriesStart.match(action)) {
    return {...state, isLoading: true};
  };

  if (fetchCategoriesSuccess.match(action)) {
    return {...state, categories: action.payload, isLoading: false};
  };

  if (fetchCategoriesFailed.match(action)) {
    return {...state, error: action.payload, isLoading: false};
  };

  return state;

  // switch(action.type) {
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     return {...state, isLoading: true};
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     return {...state, categories: action.payload, isLoading: false};
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     return {...state, error: action.payload, isLoading: false};
  //   default:
  //     return state;
  // };
};