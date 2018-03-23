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

  $(".autocomplete").keyup(function (event) {
    var letterinput = $(".autocomplete");
    var autocompleteURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number=10&query=" + letterinput;
    var autocompleteAPI = {
      "async": true,
      "crossDomain": true,
      "url": autocompleteURL,
      "method": "GET",
      "headers": {
        "X-Mashape-Key": "aVuMKS8FG3mshVQlO5dNdPxZQCdrp1FpzUDjsnZtHrg9bA3DEP",
        "Cache-Control": "no-cache",
      }
    }
    $.ajax(autocompleteAPI).then(function (response) {
      console.log(response)
    })
  })

    $(".btn").click(function () {
      event.preventDefault();
      var textInput = $(".autocomplete").val().trim().toLowerCase();
      var wineQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/wine/pairing?food=" + textInput + "&maxPrice=50";
      var wineAPI = {
        "async": true,
        "crossDomain": true,
        "url": wineQueryURL,
        "method": "GET",
        "headers": {
          "X-Mashape-Key": "aVuMKS8FG3mshVQlO5dNdPxZQCdrp1FpzUDjsnZtHrg9bA3DEP",
          "Cache-Control": "no-cache",
        }
      }
      $.ajax(wineAPI).then(function (response) {
        console.log(response)
        if (response.status === "failure") {
          $("#autocomplete-input").text(response.message)
        }
        else if (response.pairingText === "") {
          $("#autocomplete-input").html("we don't have dat")
        }
        else $(".input-field").hide();
        $(".mainHeader").html("WHAT YOU'RE SIPPIN'")
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

