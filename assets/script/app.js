
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;
$(".wineSwipe").hide();
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

      // var marker = new google.maps.Marker({
      //   position: pos,
      //   map: map,
      //   title: 'Hello World!'
      // })
      
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
      $(".wineSwipe").show();

      if (response.status === "failure") {
        $("#autocomplete-input").text(response.message)
      }
      else if (response.pairingText === "") {
        $("#autocomplete-input").html("we don't have dat")
      }


      $("#reset").on('click', function(){
        $("#words").empty();
        $("#image").empty();
        $(".input-field").show();
      });

    });

   


    var newFood = {
      newFood: textInput,
    }
    database.ref().push(newFood);
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
    console.log(childSnapshot.val());
  });
});

