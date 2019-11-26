var synth = window.speechSynthesis;
var voices = [];
var ingredients = "";
var steps =  "";
var ingredientsToSpeech = "";
var stepsToSpeech = "";
var image = "";

document.addEventListener("DOMContentLoaded", () => {
    fetch('recipe.json')
    .then(d=>d.json())
    .then(data=>{
        console.log(data);
       
        // Render display 
        display(data);
    })
})

function display(data) {
    console.log(data);

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
  
function click(e) {
    var text = e.target.getAttribute('data-words');
    speak(text);
}
  
[...document.querySelectorAll('button')].forEach(function(button) {
    button.onclick = click;
});