const express = require('express')
const router = express.Router()
const axios = require('axios');
const dairyIngredients = ["cream","cheese","milk","butter","creme","ricotta","mozzarella","custard","cream cheese","condensed milk"]
const glutenIngredients = ["flour","bread","spaghetti","biscuits","beer"]

const recUrl ='https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/'
router.get('/recipes/:intergating', function (request, response) { 
    const intergating = request.params.intergating;
    const dairy = request.query.dairy ;
    const gluten= request.query.gluten ;
    axios.get(recUrl + intergating)
    .then((result)=> { const recipes= {recipes:FilteringRecipes(result.data.results)} 
    
    if (dairy ===`true`)
    recipes.recipes = dairyFliter(recipes.recipes)
    if ( gluten ===`true`)
    recipes.recipes = glutenFliter(recipes.recipes)

    
    response.json(recipes)})
    .catch((error)=> console.log(error))

})

  function dairyFliter (results){
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



    

module.exports = router
