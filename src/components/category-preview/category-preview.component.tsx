import { CategoryPreviewContainer, Title, Preview } from "./category-preview.styles";
import { CategoryItem } from "../../store/categories/category.types";
import ProductCard from "../product-card/product-card.component";
import { FC } from "react";

type CategoryPreviewProps = {
	title: string;
	products: CategoryItem[];
};

const CategoryPreview: FC<CategoryPreviewProps> = ({ title, products }) => {
	return (
		<CategoryPreviewContainer>
				<Title to={title}>{title.toUpperCase()}</Title>
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
