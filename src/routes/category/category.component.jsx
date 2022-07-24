import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContainerRouter, CategoryTitle } from "./category.styles.jsx";
import Spinner from "../../components/spinner/spinner.component";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const [products, setProducts ] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);


  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (<Spinner />) : (
        <CategoryContainerRouter>
          { products &&
            products.map((product) => (
            <ProductCard key={product.id} product={product}></ProductCard>))
          }
      </CategoryContainerRouter> 
      )}
      
    </>
  )
};

export default Category;