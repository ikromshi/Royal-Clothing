import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { getCategoriesAsync } from "../../store/categories/category.action";
import { useDispatch } from "react-redux";

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategoriesAsync()) ;
  }, []);

	return (
		<Routes>
			<Route index element={<CategoriesPreview />}/>
			<Route path=":category" element={<Category />}/>
		</Routes>
	)
}
  
export default Shop;