class Renderer {
    
    renderresults(results){
    $("#recipeList").empty()
    const source = $("#recipe-template").html()
    const template = Handlebars.compile(source)
    let newHTML = template(results)
    $("#recipeList").append(newHTML)
   }
}

