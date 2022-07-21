import { CATEGORIES_ACTION_TYPES } from "./category.types";

const INITIAL_STATE = {
  categories: [],
  isLoading: null, // is data in the loading stage with redux thunk?
  error: null // potential error in the fetching process of the async function
};

export const categoriesReducer = (state=INITIAL_STATE, action={}) => {
  const { type, payload } = action;

  switch(type) {
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {...state, isLoading: true};
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {...state, categories: payload, isLoading: false};
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {...state, error: payload, isLoading: false};
    default:
      return state;
  };
};