
//test1
//function msg(){  
 //alert("Hello Javatpoint");  
//}  
//test 2
//document.getElementById("p1").innerHTML = "New Placeholder JS";

//Dummy DB - JSON placeholder____________________________________________:

  $( function() {
    var ingredients =     [
    {
        "name": "Spicy Salmon",
        "value": "SPICY SALMON",
        "icon" : "salmon.png"
    },
    {
        "name": "Salmon",
        "value": "SALMON",
        "icon" : "salmon.png"
    },
    {
        "name": "Tuna",
        "value": "TUNA",
        "icon" : "tuna.png"
    },
    {
        "name": "Yellow Tail",
        "value": "YELLOW TAIL",
        "icon" : "white.png"
    }

];

//Function to reset image container to empty on form reset________________:

function f1() {
    //alert("f1 called");
    //form validation that recalls the page showing with supplied inputs.    
}
window.onload = function() {
    document.getElementById("resetbutton").onclick = function fun() {
        f1();
        document.getElementById("ingredient-icon").src = "transparent.png";
        document.getElementById("ingredient-icon2").src = "transparent.png";
        document.getElementById("ingredient-icon3").src = "transparent.png";
    }
}
//Ingredient 1_______________________________________________: 

    $( "#ingredient" ).autocomplete({
      minLength: 0,
      source: ingredients,
      focus: function( event, ui ) {
        $( "#ingredient" ).val( ui.item.name );
        return false;
      },
      select: function( event, ui ) {
        $( "#ingredient" ).val( ui.item.name );
        $( "#ingredient-id" ).val( ui.item.value );
        $( "#ingredient-icon" ).attr( "src", ui.item.icon );
 
        return false;
      }
    })
    .autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<div>" + item.name + "<br>"  + "</div>" )
        .appendTo( ul );
    };

//Ingredient 2_______________________________________________: 

    $( "#ingredient2" ).autocomplete({
      minLength: 0,
      source: ingredients,
      focus: function( event, ui ) {
        $( "#ingredient2" ).val( ui.item.name );
        return false;
      },
      select: function( event, ui ) {
        $( "#ingredient2" ).val( ui.item.name );
        $( "#ingredient-id2" ).val( ui.item.value );
        $( "#ingredient-icon2" ).attr( "src", ui.item.icon );
 
        return false;
      }
    })
    .autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<div>" + item.name + "<br>" +  "</div>" )
        .appendTo( ul );
    };

//Ingredient 3_______________________________________________: 

    $( "#ingredient3" ).autocomplete({
      minLength: 0,
      source: ingredients,
      focus: function( event, ui ) {
        $( "#ingredient3" ).val( ui.item.name );
        return false;
      },
      select: function( event, ui ) {
        $( "#ingredient3" ).val( ui.item.name );
        $( "#ingredient-id3" ).val( ui.item.value );
        $( "#ingredient-icon3" ).attr( "src", ui.item.icon );
 
        return false;
      }
    })
    .autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<div>" + item.name + "<br>" +  "</div>" )
        .appendTo( ul );
    };

  } );


