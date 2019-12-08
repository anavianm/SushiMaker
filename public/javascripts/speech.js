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

        
$(".hidden").hide();
$("#loggedIn").hide();
$("#signInPlease").hide();
$("#heartButton").hide();

if((document.getElementById("loggedIn").innerHTML) == ""){
    console.log("hello");
    $("#signInPlease").show();
}else{
    $("#heartButton").show();
}

var current = document.getElementById('liked').innerHTML;
console.log(current);

var recipes = current.split(",");
var recipe = document.getElementById('recipeName').innerHTML;

//var update = current + recipe +",";
        var update = "";
document.getElementById('likedRecipe').value = update;


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
    document.getElementById("ingredientsData").innerHTML = ingredients;
    document.getElementById("stepsData").innerHTML = steps;
    document.getElementById("recipeImg").src = data[0].imageURL;

    // Create buttons to speech
    document.getElementById("ingredientsToSpeech").setAttribute('data-words', ingredientsToSpeech);
    document.getElementById("stepsToSpeech").setAttribute('data-words', stepsToSpeech);
}

function speak(text) {
    // Built-in Web Speech API
    var utterance = new SpeechSynthesisUtterance(text);
    voices = synth.getVoices();
    utterance.voice = voices[10];
    utterance.rate = 0.75;
    speechSynthesis.speak(utterance);
}
//
//function complete(e) {
//    if (!completed)  {
//        localStorage.setItem(recipe, false);
//        completed = 1;
//        completedText = '<i class="fa fa-heart"></i>' + " Completed";
//        document.getElementById('heartButton').style.cssText = 'background-color:#000000; color:#ffffff;';
//        console.log(completed);
//    } else {
//        localStorage.setItem(recipe, true);
//        console.log(localStorage(recipe));
//        completed = 0;
//        completedText = '<i class="fa fa-heart"></i>' + " Complete";
//        document.getElementById('heartButton').style.cssText = 'background-color:#ffffff; color:#000000;';
//        console.log(completed);
//    } 
//    document.getElementById("heartButton").innerHTML = completedText;
//}

//if(recipes.includes(recipe)){
//    //button already clicked
//}else{
//    //button open for click
//    if(){//button is clicked
//        //set button to clicked
//    }else{
//        //do nothing
//    }
//}


function click(e) {
    var text = e.target.getAttribute('data-words');
    speak(text);
}

[...document.querySelectorAll('button')].forEach(function(button) {
    button.onclick = click;
    document.getElementById("heartButton").onclick = complete;
});

