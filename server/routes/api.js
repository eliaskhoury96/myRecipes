const express = require('express')
const router = express.Router()
const axios = require('axios');
const recipesFilter= require('./recpises');
const recipesClass= new recipesFilter()
const errors =require('./errors')
const recUrl ='https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/'
router.get('/recipes/:intergating', function (request, response) { 
    const intergating = request.params.intergating;
    const pagination = parseInt( request.query.pagination);
    const page = parseInt( request.query.page);
    const dairy = request.query.dairy ;
    const gluten= request.query.gluten ;
    console.log(intergating)
    try{
        recipesClass.checkIngrediants(intergating)
     } catch (error) {
         if (error instanceof errors.InvalidingredientError){
           return   response.status(400).send({ "Error": `${intergating} I don't have that ingredient` })
         } 
         
     }
     axios.get(recUrl + intergating)
             .then((result) => {
                console.log('result', result.data.results)
                 let recipes = { recipes:  recipesClass.filteringRecipes(result.data.results) };
     
                 if (dairy === 'true') {
                     recipes.recipes =  recipesClass.dairyFilter(recipes.recipes);
                 }
     
                 if (gluten === 'true') {
                     recipes.recipes =  recipesClass.glutenFilter(recipes.recipes);
                 }
                 const start = page * pagination
                 const end = (page +1) * pagination
                 console.log(start, end)
                 recipes.recipes = recipes.recipes.slice(start,end)
                 recipesClass.addGifs(recipes.recipes)
                 .then(function(recipes){
                  response.status(201).json({recipes: recipes})})
                  .catch((error)=> console.log(error))

                })
                .catch((error)=> console.log(error))
            })
    
    

   



module.exports = router



