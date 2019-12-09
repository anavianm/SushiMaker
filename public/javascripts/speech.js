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

        
$(".hidden").hide();
$("#loggedIn").hide();
$("#signInPlease").hide();
//$(".heartButton").hide();
//$("#signButton").hide();




document.addEventListener("DOMContentLoaded", () => {
    fetch('/stylesheets/recipe.json') 
    .then(d=>d.json())
    .then(data=>{
        console.log(data);

        // Render display 
        display(data);
    })
    
    
})

function display(data) {
    console.log(data);
    document.getElementById("page").style.visibility = 'visible';

    // Store data
    ingredients += "<ul>";
    for (x in data[0].ingredients) {
        ingredients += "<li>" + data[0].ingredients[x].quantity + data[0].ingredients[x].name;
        ingredientsToSpeech += data[0].ingredients[x].quantity + data[0].ingredients[x].name + ". ";
    }
    ingredients += "</ul>";

    steps += "<ol>";
    for (x in data[0].steps) {
        steps += "<li>" + data[0].steps[x];
        stepsToSpeech += data[0].steps[x];
    }
    steps += "</ol>";

    // Show data
    document.getElementById("recipeName").innerHTML = data[0].name;
    loadedRecipe = data[0].name;
    document.getElementById("ingredientsData").innerHTML = ingredients;
    document.getElementById("stepsData").innerHTML = steps;
    document.getElementById("recipeImg").src = data[0].imageURL;

    // Create buttons to speech
    document.getElementById("ingredientsToSpeech").setAttribute('data-words', ingredientsToSpeech);
    document.getElementById("stepsToSpeech").setAttribute('data-words', stepsToSpeech);
    
     var currentList = document.getElementById('liked').innerHTML;
    console.log(currentList);
    var recipes = currentList.split(",");
    var currentrecipe = loadedRecipe;
    //var currentrecipe = document.getElementById('recipeName').innerHTML;
    //console.log(ocument.getElementById('recipeName').innerHTML);
    console.log("curr is" + currentrecipe);

    //var update = current + recipe +",";
    
    
    var update = "Salmon Avocado Roll, Tuna Roll, Veggie Roll";
                document.getElementById('likedRecipe').value = update;
    
    if((document.getElementById("loggedIn").innerHTML) == ""){
        console.log("hello");
         console.log("X sign in");
        $("#signInPlease").show();
        $("#heartButton").hide();
    }
    

    console.log(document.getElementById("loggedIn").innerHTML);
    
//    if((document.getElementById("loggedIn").innerHTML) == ""){
//        console.log("hello");
//         console.log("X sign in");
//        $("#signInPlease").show();
//        $("#heartButton").hide();
    if(document.getElementById("loggedIn").innerHTML != ""){
        console.log(recipes);
        console.log("this is inner" + document.getElementById('heartButton').innerHTML);
        
        if((document.getElementById('heartButton').innerHTML == '<i class="fa fa-heart"></i> Completed') && (recipes.includes(currentrecipe))){
            for(var i = 0; i < recipes.length; i ++){
                if(recipes[i] == currentrecipe){
                    recipes.splice(i,1);
                    console.log(recipes);
                    currentList = recipes.join();
                    document.getElementById('likedRecipe').value = currentList;
                    completedText = '<i class="fa fa-heart"></i>' + " Complete";
                    document.getElementById('heartButton').style.cssText = 'background-color:#ffffff; color:#000000;';
                    document.getElementById("heartButton").innerHTML = completedText;
                }
            }
            
        }else if(recipes.includes(currentrecipe)){
            document.getElementById('likedRecipe').value = update;
            console.log("This is a " + currentrecipe);
            completedText = '<i class="fa fa-heart"></i>' + " Completed";
            document.getElementById('heartButton').style.cssText = 'background-color:#000000; color:#ffffff;';
            document.getElementById("heartButton").innerHTML = completedText;
        }else{
            console.log("sign in");
            $("#heartButton").show();
            $("#signInPlease").hide();
        }
    }
    
     console.log(document.getElementById("heartButton").innerHTML);
    
    


}

$(document).ready(function() {
  
})
    

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

