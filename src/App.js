import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./components/Recipe";
import Spinner from "./components/Spinner";

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("vegetable");

    useEffect(() => {
        const APP_ID = process.env.REACT_APP_API_ID;
        const APP_KEY = process.env.REACT_APP_API_KEY;

        const getRecipes = async () => {
            const res = await fetch(
                `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
            );
            const data = await res.json();
            // console.log(data.hits);
            return setRecipes(data.hits);
        };
        getRecipes();
    }, [query]);

    const updateSearch = e => setSearch(e.target.value);

    const getSearch = e => {
        e.preventDefault();
        setRecipes([]);
        setQuery(search);
        setSearch("");
    };

    return (
        <div className="App">
            <form className="search-form" onSubmit={getSearch}>
                <input
                    type="text"
                    value={search}
                    onChange={updateSearch}
                    className="search-bar"
                    placeholder="Search for a recipe"
                />
                <input
                    style={{ marginLeft: "20px" }}
                    type="submit"
                    className="search-button"
                    value="Search"
                />
            </form>
            {recipes === "undefined" || recipes.length === 0 ? (
                <Spinner />
            ) : (
                <div className="recipes">
                    {recipes.map(recipe => (
                        <Recipe
                            key={Math.round(recipe.recipe.calories)}
                            title={recipe.recipe.label}
                            image={recipe.recipe.image}
                            ingredients={recipe.recipe.ingredients}
                            url={recipe.recipe.url}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;
