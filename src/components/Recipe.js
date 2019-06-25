import React from "react";
import style from "../recipe.module.css";
const Recipe = ({ title, image, ingredients, url }) => {
    return (
        <div className={style.recipe}>
            <h1>{title}</h1>
            <ol>
                {ingredients.map((ingredient, index) => (
                    <li className={style.items} key={index}>
                        {ingredient.text}
                    </li>
                ))}
            </ol>
            <a
                className="search-button"
                style={{ margin: "20px", textDecoration: "none" }}
                target="__blank"
                href={url}
            >
                Click here for detailed recipe
            </a>
            <img src={image} alt={title} />
        </div>
    );
};

export default Recipe;
