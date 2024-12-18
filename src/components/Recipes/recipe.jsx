import { useEffect, useState } from "react";
import "./recipe.css";
import { useLocation, useNavigate } from 'react-router'
import axios from "axios";


export function RecipeElement ({recipes}) {

    const location = useLocation()
    console.log(location.search)

    const recipe = recipes.find((recipe) => recipe._id === location.search.split("=")[1])

    

    
    return (
        <div className="recipeContainer">
            <div className="recipeCardPage">
                <span className="recipeHeader">
                        <h1>{recipe.title}</h1>
                        <h3>{recipe.cuisineType}</h3>
                    </span>
                <p>{recipe.instructions}</p>
                <ul>
                    {recipe.ingredients.map((ingredient, index) => {
                        return <li key={index}>{ingredient}</li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export function RecipesCards ({ recipes }) {
    const Navigate = useNavigate()


    return (
        recipes.map((recipe, index) => {
                return (
                    <div className="recipeCard" key={index}>
                        <span className="recipeHeader">
                            <h1>{recipe.title}</h1>
                            <h3>{recipe.cuisineType}</h3>
                        </span>
                        <p>{recipe.instructions}</p>
                        <p onClick={() => Navigate(`/recipe?id=${recipe._id}`) }className="seemore">see more..</p>
                    </div>
                )
            })
        )
}