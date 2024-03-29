import {BackgroundImage, BodyContainer, CategoryContainer } from "./category-item.styles";
import { DirectoryCategory } from "../directory/directory.component.js";
import { useNavigate } from "react-router-dom";
import { FC } from "react";

type CategoryItemProps = {
  category: DirectoryCategory;
}

const CategoryItem: FC<CategoryItemProps> = ({ category }) => {
    const { imageUrl, title, route } = category;
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);

    return (
      <CategoryContainer onClick={onNavigateHandler}>
        <BackgroundImage imageUrl={imageUrl} />
        <BodyContainer>
          <h2>{title}</h2>
          <p>Shop now</p>
          </BodyContainer>
        {/* </BackgroundImage> */}
      </CategoryContainer>
    )
}

export default CategoryItem;