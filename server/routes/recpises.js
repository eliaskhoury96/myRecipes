const errors = require('./errors');
const {faker} =require(`@faker-js/faker`)

const dairyIngredients = ["cream","cheese","milk","butter","creme","ricotta","mozzarella","custard","cream cheese","condensed milk"];
const glutenIngredients = ["flour","bread","spaghetti","biscuits","beer"];

class recipes {
    createRecipeObject(recipe) {
        const chef = this.generateChefName();
        const rating = this.generateRating();

        return {
            idMeal: recipe.idMeal,
            ingredients: recipe.ingredients,
            title: recipe.title,
            thumbnail: recipe.thumbnail,
            href: recipe.href,
            chef: chef,
            rating: rating,
        };
    }

    generateChefName() {
        const chefName = faker.person.firstName();
        const chefLastName = faker.person.lastName();
        return `${chefName} ${chefLastName}`;
    }

    generateRating() {
        return Math.floor(Math.random() * 5) + 1;
    }

    checkIngrediants(ingrediant) {
        if (!ingrediant.match(/^[a-z]+$/i)) {
            throw new errors.InvalidingredientError();
        }
    }

    dairyFliter(results) {
        const dairyArr = [];
        for (let result of results) {
            const found = result.ingredients.some(r => dairyIngredients.includes(r.toLowerCase()));
            if (!found) {
                dairyArr.push(result);
            }
        }
        return dairyArr;
    }

    glutenFliter(results) {
        const glutenArr = [];
        for (let result of results) {
            const found = result.ingredients.some(r => glutenIngredients.includes(r.toLowerCase()));
            if (!found) {
                glutenArr.push(result);
            }
        }
        return glutenArr;
    }

    FilteringRecipes(arr) {
        let filteringRecipesArr = arr.map(recipe => {
            const recipeObject = this.createRecipeObject(recipe);
            return recipeObject
        });

        return filteringRecipesArr;
    }
}

module.exports = { recipes }
