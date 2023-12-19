

const dairyIngredients = ["cream","cheese","milk","butter","creme","ricotta","mozzarella","custard","cream cheese","condensed milk"]
const glutenIngredients = ["flour","bread","spaghetti","biscuits","beer"]

class recipes{

    dairyFliter (results){
        const dairyArr = []
        for( let result of results){
        const found = result.ingredients.some(r=> dairyIngredients.includes(r.toLowerCase()))
          if(!found)
        dairyArr.push(result)
    }
    return dairyArr; 
    }
    glutenFliter (results){
        const glutenArr = []
    for( let result of results){
        const found = result.ingredients.some(r=> glutenIngredients.includes(r.toLowerCase()))
    if(!found)
    glutenArr.push(result)
    }
    return glutenArr; 
    }
      FilteringRecipes  (arr) {
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
    
}




module.exports = {recipes}