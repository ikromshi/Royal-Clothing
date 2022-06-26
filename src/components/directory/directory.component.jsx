import CategoryItem from "../category-item/category-item.component";
import { DirectoryContainer } from "./directory.styles.jsx";

const Directory = ({categories, string}) => {
    return (
        <DirectoryContainer>
            {categories.map((category) => (
            <CategoryItem key={category.id} category={category}/>
        ))}
      
        </DirectoryContainer>
    )
}

export default Directory;