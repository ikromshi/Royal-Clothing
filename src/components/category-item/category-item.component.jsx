import {BackgroundImage, BodyContainer, CategoryContainer } from "./category-item.styles.jsx";

const CategoryItem = ({ category }) => {
    const { imageUrl, title } = category;
    return (
      <CategoryContainer>
        <BackgroundImage imageUrl={imageUrl}/>
        <BodyContainer>
          <h2>{title}</h2>
          <p>Shop now</p>
        </BodyContainer>
      </CategoryContainer>
    )
}

export default CategoryItem;