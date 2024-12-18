import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import './home.css'
import axios from "axios"

import { useLocation } from 'react-router'

import recipesJSON from "../../recipes.json"

import {RecipesCards, Recipe, RecipeElement} from "../../components/Recipes/recipe"

export default function Home () {
    const Navigate = useNavigate()
    let location = useLocation()

    const user = localStorage.getItem("userToken")
    useEffect(() => {
        if(!user) {
            window.location.assign("/login");
        }
    }, [])

    const [title, setTitle] = useState("")
    const [type, setType] = useState("")

    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState("")

    const [instructions, setInstructions] = useState("")
    
    const [searchValue, setSearchValue] = useState("")
    const [selectedOption, setSelectedOption] = useState("cuisineType");

    const [newRecipe, setNewRecipe] = useState(false)
    const [recipes, setRecipes] = useState([])

    useEffect( () => {
        axios.get("http://localhost:3001/recipes", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("userToken"),
            }}).then((response) => {
                setRecipes(response.data)
            }).catch((error) => {  
                console.log(error)
            })

    }, [newRecipe])

    const handleIngredients = () => {
        let newIngredients = [...ingredients]

        if(ingredient === "") {
            return alert("Please enter an ingredient")
        }
        
        newIngredients.push(ingredient)
        setIngredient("")
        setIngredients(newIngredients)
    }

    const handleSaved = () => {
        setIngredients([])
        setInstructions("")
        setType("")
        setTitle("")
        setNewRecipe(!newRecipe)
    }


    const handleSaveRecipe = () => {

        if(ingredients.length = 0 || title === "" || type === "" || instructions === "") {
            return alert("Please complete the recipies")
        }

        let recipe = {
            title: title,
            cuisineType: type,
            ingredients: ingredients,
            instructions: instructions,
        }

        axios.post("http://localhost:3001/recipe", recipe, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("userToken"),
              }
        }).then((response) => {
            console.log(response)
            if(response.data.result) {
                alert("Recipe saved")
                handleSaved()
            } else {
                alert("Error saving recipe")
        }}).catch((error) => {
            alert(error, "Error saving recipe")
        })
        
    }

    const handleSaveRecipe2 = () => {

        recipesJSON.map((recipe) => {
            axios.post("http://localhost:3001/recipe", recipe, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("userToken"),
                  }
            }).then((response) => {
                console.log(response)
                if(response.data.result) {
                    alert("Recipe saved")
                    handleSaved()
                } else {
                    alert("Error saving recipe")
            }}).catch((error) => {
                alert(error, "Error saving recipe")
            })
        })
    }

    const handleChangeSearch = (event) => {
        setSelectedOption(event.target.value);
      };

    const handleSarch = () => {
        let mySearch = ""

        if(selectedOption === "cuisineType") {
            mySearch = "?cuisineType=" + searchValue
        } else if (selectedOption === "title") {
            mySearch = "?title=" + searchValue
        } else if (selectedOption === "ingredients") {
            mySearch = "?ingredients=" + searchValue
        }

        if (searchValue === "") {
            mySearch = ""
        }


        axios.get(`http://localhost:3001/recipes${mySearch}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("userToken"),
            }}).then((response) => {
                setRecipes(response.data)
            }).catch((error) => {  
                console.log(error)
            })
    }

    return (
        <div className="homeContainer">
            <div className="homeHeader">
                <select className="selectSearch" value={selectedOption} onChange={handleChangeSearch}>
                    <option value="cuisineType">Culture</option>
                    <option value="title">Title</option>
                    <option value="ingredients">Ingredient</option>
                </select>
                <input className="inputSearch" type="text" placeholder="Search" onChange={(e) => setSearchValue(e.target.value)}/>
                <button className="btnSearch" onClick={handleSarch}>Search</button>
            </div>

            <div className="homeContent">
                <div className="recipeCards">
                    {location.pathname === "/recipe" ? 
                        <RecipeElement recipes={recipes}/> :
                        <RecipesCards recipes={recipes} />
                    }
                </div>

                <div className="sidebar">
                    <div className="inputContainer">
                            <input className="input titleIngredient" type="text" placeholder="Title" value={type} onChange={(e) => setType(e.target.value)}/>
                            <input className="input titleIngredient" type="text" placeholder="Culture (ex. french)" value={title} onChange={(e) => setTitle(e.target.value)}/>
                            <span className="ingredientContainer">
                                <input className="input ingredient" type="text" placeholder="Ingreditents" value={ingredient} onChange={(e) => setIngredient(e.target.value)}  />
                                <button  className="saveBtn" onClick={handleIngredients}>Add</button>
                            </span>

                            <input className="input descIngr" type="text" placeholder="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)}  />
                    </div>
                    <div className="ingredientsList">
                        <p>Added Ingredients: {ingredients.length}</p>
                        <ul>
                        {ingredients.map((ingredient, index) => {   
                                return <li key={index}>{ingredient}</li>
                            }
                            )}
                        </ul>
                    </div>
                    <button className="recipeBtn" onClick={handleSaveRecipe}>
                        Create new Recepie
                    </button>
{/*                     <button className="recipeBtn" onClick={handleSaveRecipe2}>
                        JSON
                    </button> */}
                </div>
            </div>

        </div>
    )
}