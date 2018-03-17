$(".btn").click(function () {
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/wine/pairing?food=alfredo&maxPrice=50",
    "method": "GET",
    "headers": {
      "X-Mashape-Key": "aVuMKS8FG3mshVQlO5dNdPxZQCdrp1FpzUDjsnZtHrg9bA3DEP",
      "Cache-Control": "no-cache",
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
  })
});