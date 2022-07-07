import { useState, useEffect, createContext } from "react";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

export const CategoriesProvider = ({children}) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = {categoriesMap};

  useEffect(() => {
    const getCategoriesMap = async() => {
      const categoriesMap = await getCollectionAndDocuments();
      setCategoriesMap(categoriesMap);
    };

    getCategoriesMap();
  }, []);

  return (
    <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
  );
};

