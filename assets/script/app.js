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

        var p = $("<p>");
         p.text(response.pairingText);
        $("#words").append(p);

        var description = $("<p>");
        description.text(response.productMatches[0].description);
        $("#words").append(description);
    
        var img = $("<img>");
        img.attr("src", response.productMatches[0].imageUrl);
         $("#image").append(img);

        var title = $("<p>");
       title.text(response.productMatches[0].title)
        $("#image").append(title);


///if else statement for no wine found v. wine 
// if response.status append error else run normally?

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

