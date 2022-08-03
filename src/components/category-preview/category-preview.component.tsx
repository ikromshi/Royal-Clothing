import { FC } from "react";
import { CategoryItem } from "../../store/categories/category.types";
import ProductCard from "../product-card/product-card.component";
import { CategoryPreviewContainer, Title, Preview } from "./category-preview.styles.jsx";

type CategoryPreviewProps = {
	title: string;
	products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
	return (
		<CategoryPreviewContainer>
			<h2>
				<Title to={title}>{title.toUpperCase()}</Title>
			</h2>
			<Preview>
				{
					products
						.filter((_, idx) => idx < 4)
						.map(product => 
							<ProductCard key={product.id} product={product}></ProductCard> 
						)
					}
			</Preview>
		</CategoryPreviewContainer>
	)
}

export default CategoryPreview;     
