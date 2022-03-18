import "./directory.component.scss";
import CategoryItem from "../category-item/category-item.component";

const Directory = ({categories}) => {
    return (
        <div className="categories-container">
        {categories.map((category) => {
            return (
            <CategoryItem key={category.id} category={category}/>
        )})}
        </div>
    )
}

export {Directory as default};