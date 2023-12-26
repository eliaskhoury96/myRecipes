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

    filterRecipes(results, ingredients) {
        const filteredArr = [];
        for (let result of results) {
            const found = result.ingredients.some(r => ingredients.includes(r.toLowerCase()));
            if (!found) {
                filteredArr.push(result);
            }
        }
        return filteredArr;
    }

    dairyFilter(results) {
        return this.filterRecipes(results,dairyIngredients);
    }

    glutenFilter(results) {
        return this.filterRecipes(results,glutenIngredients);
    }

    filteringRecipes(arr) {
        return arr.map(recipe => this.createRecipeObject(recipe));
    }
}

module.exports = recipes;