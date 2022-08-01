import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { CategoryAction } from "./category.action";

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

export const categoriesReducer = (state=INITIAL_STATE, action={} as CategoryAction) => {

  switch(action.type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {...state, isLoading: true};
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {...state, categories: action.payload, isLoading: false};
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {...state, error: action.payload, isLoading: false};
    default:
      return state;
  };
};