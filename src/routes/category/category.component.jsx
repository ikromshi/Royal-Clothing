import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories.context"; 
import ProductCard from "../../components/product-card/product-card.component";
import { CategoryContainerRouter, CategoryTitle } from "./category.styles.jsx";

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);
  const [products, setProducts ] = useState([]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);


  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainerRouter>
        { products &&
          products.map((product) => (
          <ProductCard key={product.id} product={product}></ProductCard>))
        }
      </CategoryContainerRouter> 
    </>
  )
};

export default Category;