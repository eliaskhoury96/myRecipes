const renderer = new Renderer()
 function search() {
    let ingredient = $('#ingredientInput').val()
    const dairy=($('#vehicle1').is(":checked"))
    const gluten=($('#vehicle2').is(":checked"))
  $.get(`/recipes/`+ ingredient +`?dairy=${dairy}&gluten=${gluten}`) .then((results)=> {
   renderer.renderresults(results)
  }).catch((error)=>{
    alert(error.responseJSON.Error)

  })
  
}
    
$("#recipeList").on("click", "img", function() {
const firstIngredient = $(this).closest(`div`).children(`ul`).find(`li:first`).text()
  alert(firstIngredient);
});