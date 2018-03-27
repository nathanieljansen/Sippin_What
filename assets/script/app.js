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

var zip = "";

var map, infoWindow;
// $(".wineSwipe").hide();
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 39.7392, lng: -104.9903 },
    zoom: 13
  });
  infoWindow = new google.maps.InfoWindow;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      console.log("its working", pos)

      $.ajax({
        url: "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + pos.lat + "," + pos.lng + "&sensor=true",
        type: "GET",
      }).then(function (resultsBack) {
        console.log('did it work ???', resultsBack.results[2].address_components[0].long_name);
        zip = resultsBack.results[2].address_components[0].long_name;
      })
      
      // var userPostion = {
      //   userPosition: pos,
      // }
      // database.ref().push(userPosition)

      infowindow = new google.maps.InfoWindow();
      var service = new google.maps.places.PlacesService(map);
      service.nearbySearch({
        location: pos,
        radius: 2000,
        type: ['liquor_store']
      }, callback);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);

}


$(function () {
  $('.parallax').parallax();

  function pageScroll() {
    window.scrollBy(0, 325);
    // scrolldelay = setTimeout(pageScroll, 7);
  }




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
        console.log(response.message)
        $(".notValid").text("Sorry! " + response.message +". We are always trying to improve. Thanks for you help!")
      }
      else if (response.pairingText === "") {
        $(".notValid").text("Thanks for making us better! We didn't find a pairing for " + textInput + " but we are always trying to improve our app" )
      }

      else {
        $(".notValid").empty();
        pageScroll();
        var otherWines = response.pairedWines[0];

       $("#words").empty();
        var p = $("<p>");
        p.text(response.pairingText);
        $("#words").append(p);

        var description = $("<p>");
        description.text(response.productMatches[0].description);
        $("#words").append(description);

        $("#image").empty();
        console.log("empty again")
        var img = $("<img>");
        img.attr("src", response.productMatches[0].imageUrl);
        $("#image").html(img);

        var title = $("<p>");
        title.text(response.productMatches[0].title)
        $("#image").append(title);
        $(".wineSwipe").show();
      }

      var comparableWineQueryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/wine/recommendation?maxPrice=50&minRating=0.7&number=3&wine=" + otherWines;
      var comparableAPI = {
        "async": true,
        "crossDomain": true,
        "url": comparableWineQueryURL,
        "method": "GET",
        "headers": {
          "X-Mashape-Key": "aVuMKS8FG3mshVQlO5dNdPxZQCdrp1FpzUDjsnZtHrg9bA3DEP",
          "Cache-Control": "no-cache",
        }
      }
      $.ajax(comparableAPI).then(function (response) {
        console.log(response.recommendedWines)
        $("#otherWineImage1").empty();
        var img = $("<img>");
        img.attr("src", response.recommendedWines[0].imageUrl);
        $("#otherWineImage1").append(img);
        
        $("#otherWineImage2").empty();
        var img = $("<img>");
        img.attr("src", response.recommendedWines[1].imageUrl);
        $("#otherWineImage2").append(img);
        // var img = $("<img>");
        // img.attr("src", response.recommendedWines[2].imageUrl);
        // $("#otherWineImage3").append(img);
        var title = $("<p>");
        title.text(response.recommendedWines[0].title)
        $("#otherWineImage1").append(title);
        var title = $("<p>");
        title.text(response.recommendedWines[1].title)
        $("#otherWineImage2").append(title);
        // var title = $("<p>");
        // title.text(response.recommendedWines[2].title)
        // $("#otherWineImage3").append(title);
      })

    });




    var newFood = {
      newFood: textInput,
    }

    database.ref("/" + zip).push(newFood);
    $(".autocomplete").val("");

  });

  // $(".autocomplete").keyup(function (event) {
  //   var letterinput = $(".autocomplete").val();
  //   var autocompleteURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/autocomplete?number=10&query=" + letterinput;
  //   var autocompleteAPI = {
  //     "async": true,
  //     "crossDomain": true,
  //     "url": autocompleteURL,
  //     "method": "GET",
  //     "headers": {
  //       "X-Mashape-Key": "aVuMKS8FG3mshVQlO5dNdPxZQCdrp1FpzUDjsnZtHrg9bA3DEP",
  //       "Cache-Control": "no-cache",
  //     }
  //   }
  //   $.ajax(autocompleteAPI).then(function (response) {
  //     console.log(response)
  //   })
  // })

  database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    // console.log(childSnapshot.val());
  });
});

