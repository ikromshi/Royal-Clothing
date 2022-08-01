import { createSelector } from "reselect";
import { CategoryState } from "./category.reducer";
import { CategoryMap } from "./category.types";

const selectCategoryReducer = (state): CategoryState => state.categories; 

const selectCategories = createSelector(selectCategoryReducer, 
  (categoriesSlice) => categoriesSlice.categories);

export const selectCategoriesMap = createSelector(selectCategories, (categories) => {
  return categories.reduce((acc, category): CategoryMap => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
    }, {} as CategoryMap);
});

export const selectCategoriesIsLoading = createSelector(selectCategoryReducer,
  (categoriesSlice) => categoriesSlice.isLoading);