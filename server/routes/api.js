const express = require('express')
const router = express.Router()
const axios = require('axios');
const recipesFilter= require('./recpises');
const recipesClass= new recipesFilter.recipes()
const recUrl ='https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/'
router.get('/recipes/:intergating', function (request, response) { 
    const intergating = request.params.intergating;
    const dairy = request.query.dairy ;
    const gluten= request.query.gluten ;
    axios.get(recUrl + intergating)
    .then((result)=> { const recipes= {recipes:recipesClass.FilteringRecipes(result.data.results)} 

    if (dairy ===`true`)
    recipes.recipes = recipesClass.dairyFliter(recipes.recipes)
    if ( gluten ===`true`)
    recipes.recipes = recipesClass.glutenFliter(recipes.recipes)
    response.status(201).json(recipes)})
    .catch((error)=> console.log(error))

})

 /* try{
      
    } catch (error) {
        if (error instanceof InvalidingredientError){
            res.status(400).send({ "Error": `${ingredient} is not a valid ingredient` })
        } 
        
    }
})
   */ 

  /*function dairyFliter (results){
    const dairyArr = []
    for( let result of results){
    const found = result.ingredients.some(r=> dairyIngredients.includes(r.toLowerCase()))
      if(!found)
    dairyArr.push(result)
}
return dairyArr; 
}
 function glutenFliter (results){
    const glutenArr = []
for( let result of results){
    const found = result.ingredients.some(r=> glutenIngredients.includes(r.toLowerCase()))
if(!found)
glutenArr.push(result)
}
return glutenArr; 
}

const FilteringRecipes = function(arr) {
    let FilteringRecipesArr = arr.map(recipe => {
        
        return {
            idMeal: recipe.idMeal,
            ingredients: recipe.ingredients,
            title: recipe.title,
            thumbnail: recipe.thumbnail,
            href: recipe.href
        }
            
    })

    return FilteringRecipesArr;
}

*/

    

module.exports = router
