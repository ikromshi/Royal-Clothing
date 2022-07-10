// import { CategoriesContext } from "../../contexts/categories.context";
import { selectCategoriesMap } from "../../store/categories/category.selector";
import { useSelector } from "react-redux";
import { useContext, Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
	// const { categoriesMap } = useContext(CategoriesContext);
	const categoriesMap = useSelector(selectCategoriesMap);
	console.log("CATEGORIES MAP: ", categoriesMap)

	return (
    <Fragment>
			{Object.keys(categoriesMap).map(title => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview key={title} title={title} products={products}></CategoryPreview>
				);
			})}
		</Fragment>
	)
}
  
export default CategoriesPreview;