
let page =0
let pagination =4
let lastIngredient = $('#ingredientInput').val()
const renderer = new Renderer()
 function search() {
  let ingredient = $('#ingredientInput').val()
    if(ingredient != lastIngredient ){
    page = 0
 }
 lastIngredient = ingredient
    const dairy=($('#vehicle1').is(":checked"))
    const gluten=($('#vehicle2').is(":checked"))
  $.get(`/recipes/`+ ingredient +`?dairy=${dairy}&gluten=${gluten}&page=${page}&pagination=${pagination}`) .then((results)=> {
   renderer.renderresults(results)
  }).catch((error)=>{
    alert(error.responseJSON.Error)

  })
}

    
$("#recipeList").on("click", "img", function() {
const firstIngredient = $(this).closest(`div`).children(`ul`).find(`li:first`).text()
  alert(firstIngredient);
});

function sendMail(name,url){
  const Subject = `Check out this recipe!` + name
  const body = `You can see the recipe in this video`+ url
  const link = ` mailto:?subject`+Subject +"&body=" + body
  location.href = link
}
 
function next (){
  page += 1
  search() 
}
function back(){
  if (page !=0){
  page -= 1
  search() 
}
}