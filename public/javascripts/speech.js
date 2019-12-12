var synth = window.speechSynthesis;
var voices = [];
var ingredients = "";
var steps =  "";
var ingredientsToSpeech = "";
var stepsToSpeech = "";
var image = "";
var completed = 0;
var completedText = "";
var page = "";
var loadedRecipe;
var clickedRecipe;
var recipeId;

        
$(".hidden").hide();
$("#liked").hide();
$("#loggedIn").hide();
$("#signInPlease").hide();
//$(".heartButton").hide();
//$("#signButton").hide();


document.addEventListener("DOMContentLoaded", () => {
    fetch('./stylesheets/recipeResponse.json') 
//    fetch('recipe.json') 
    .then(d=>d.json())
    .then(data=>{
        console.log(data);

        // Render display 
        display(data);
    }).catch(e => {
        console.log(e);
    })
})

function display(data) {
    console.log("hello")
    console.log(data);
    document.getElementById("page").style.visibility = 'visible';

    // Store data
    ingredients += "<ul>";
    
    for(var i = 0; i < data.length; i++){
        if (data[i].name == clickedRecipe){
            recipeId = i;
        }
    }
    
    for (x in data[recipeId].ingredients) {
        ingredients += "<li>" + data[recipeId].ingredients[x].quantity + data[recipeId].ingredients[x].name;
        ingredientsToSpeech += data[recipeId].ingredients[x].quantity + data[recipeId].ingredients[x].name + ". ";
    }
    
    ingredients += "</ul>";

    steps += "<ol>";
    for (x in data[recipeId].instructions) {
        steps += "<li>" + data[recipeId].instructions[x];
        stepsToSpeech += data[recipeId].instructions[x];
    }
    steps += "</ol>";

    // Show data
    document.getElementById("recipeName").innerHTML = data[recipeId].recipe;
//    
//    document.getElementById("cooktime").innerHTML = data[0].time;
//    
//    document.getElementById("servings").innerHTML = data[0].servings;
//    
//    document.getElementById("calories").innerHTML = data[0].calories
    
    loadedRecipe = data[recipeId].recipe;
    document.getElementById("ingredientsData").innerHTML = ingredients;
    document.getElementById("stepsData").innerHTML = steps;
//    document.getElementById("recipeImg").src = data[0].imageURL;

    // Create buttons to speech
    document.getElementById("ingredientsToSpeech").setAttribute('data-words', ingredientsToSpeech);
    document.getElementById("stepsToSpeech").setAttribute('data-words', stepsToSpeech);
    
    var currentList = document.getElementById('liked').innerHTML;
    console.log(currentList);
    
    var recipes = currentList.split(", ");
    
    var currentrecipe = loadedRecipe;
    console.log(currentrecipe);
    
    var update ;
    
    
//    var update = "Salmon Avocado Roll, Tuna Roll, Veggie Roll";
    document.getElementById('likedRecipe').value = update;
    
    if((document.getElementById("loggedIn").innerHTML) == ""){
        console.log("hello");
         console.log("X sign in");
        $("#signInPlease").show();
        $("#heartButton").hide();
    }
    console.log(document.getElementById("loggedIn").innerHTML);
    
    if(document.getElementById("loggedIn").innerHTML != ""){
        console.log(recipes);
        console.log("this is inner" + document.getElementById('heartButton').innerHTML);        if(recipes.includes(currentrecipe)){
            console.log("here");
            document.getElementById('heartButton').innerHTML = '<i class="fa fa-heart"></i> Completed'
            document.getElementById('heartButton').style.cssText = 'background-color:#000000; color:#ffffff;';
            for(var i = 0; i < recipes.length; i++){
                if (recipes[i] == currentrecipe){
                    recipes.splice(i,1);
                    update = recipes.join(", ");
                    document.getElementById('likedRecipe').value = update;
                }
            }
            
        }else{
            console.log(" N here");
            document.getElementById('heartButton').innerHTML = '<i class="fa fa-heart"></i> Complete'
            document.getElementById('heartButton').style.cssText = 'background-color:#ffffff; color:#000000;';
            recipes.push(currentrecipe);
            update = recipes.join(", ");
            document.getElementById('likedRecipe').value = update;
        }
    }
    
     console.log(document.getElementById("heartButton").innerHTML);

}
    

function speak(text) {
    // Built-in Web Speech API
    var utterance = new SpeechSynthesisUtterance(text);
    voices = synth.getVoices();
    utterance.voice = voices[10];
    utterance.rate = 0.75;
    speechSynthesis.speak(utterance);
}



function click(e) {
    var text = e.target.getAttribute('data-words');
    speak(text);
}

//[...document.querySelectorAll('button')].forEach(function(button) {
//    button.onclick = click;
//    document.getElementById("heartButton").onclick = complete;
//});

