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


    })
    $(".autocomplete").val("");

    // $("#words").on("click", "btn" function(event) {
    //   $("#words").empty();

    // });


  })
});