$(function () {

  var config = {
    apiKey: "AIzaSyCEsZxf-oF64tfJK_saGz85n0TqBi1yHlA",
    authDomain: "sippin-what.firebaseapp.com",
    databaseURL: "https://sippin-what.firebaseio.com",
    projectId: "sippin-what",
    storageBucket: "sippin-what.appspot.com",
    messagingSenderId: "175010578796"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $(".btn").click(function () {
    event.preventDefault();
    var textInput = $(".autocomplete").val().trim().toLowerCase();
    var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/wine/pairing?food=" + textInput + "&maxPrice=50";
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": queryURL,
      "method": "GET",
      "headers": {
        "X-Mashape-Key": "aVuMKS8FG3mshVQlO5dNdPxZQCdrp1FpzUDjsnZtHrg9bA3DEP",
        "Cache-Control": "no-cache",
      }
    }
    $.ajax(settings).then(function (response) {
      console.log(response);
        if (response.status == "failure") {
          console.log(response.message)
        }
      })
      
    var newFood = {
      newFood: textInput,
    }
      database.ref().push(newFood);
      $(".autocomplete").val("");
    });
    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
      console.log(childSnapshot.val());
    });
  });

