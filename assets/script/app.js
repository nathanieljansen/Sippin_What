var config = {
  apiKey: "AIzaSyCEsZxf-oF64tfJK_saGz85n0TqBi1yHlA",
  authDomain: "sippin-what.firebaseapp.com",
  databaseURL: "https://sippin-what.firebaseio.com",
  projectId: "sippin-what",
  storageBucket: "sippin-what.appspot.com",
  messagingSenderId: "175010578796"
};
firebase.initializeApp(config);

$(function () {

  $(".btn").click(function () {
    var textInput = $(".autocomplete").val().trim().toUpperCase();
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

    $.ajax(settings).done(function (response) {
      console.log(response);
    })
    $(".autocomplete").val("");
  })
});