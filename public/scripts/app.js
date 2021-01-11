// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

// Initialize and add the map
function initMap() {
  // The location of Niagra
  const niagra = { lat: 43.08819077186206, lng: -79.07223055850586 };
  // Locations of coffee shops in Niagra
  const coffee_shop_1 = { lat: 43.0958356243389, lng: -79.07055451075264 };
  const coffee_shop_2 = { lat: 43.08278060767427, lng: -79.08079415535241 };
  const coffee_shop_3 = { lat: 43.08995795769985, lng: -79.095385372843 };

  // Map options
  let options = {
    zoom: 12,
    center: niagra
  };

  // The map, centered at Niagra
  let map = new google.maps.Map(document.getElementById("map"), options);

  // Listen for click on map
  google.maps.event.addListener(map, 'click',
    function (event) {
      // Add marker
      addMarker({ coords: event.latLng });
    })

  // // Array of markers
  // let markers = [
  //   { coords: coffee_shop_1, iconImage: "../images/free_breakfast-24px.svg", content: '<h2>Italian Ice Cream</h2>' },
  //   { coords: coffee_shop_2, iconImage: "../images/free_breakfast-24px.svg", content: '<h2>Tim Hortons</h2>' },
  //   { coords: coffee_shop_3, iconImage: "../images/free_breakfast-24px.svg", content: '<h2>Starbucks</h2>' }
  // ];

  // // Loop markers
  // for (const values of markers) {
  //   addMarker(values);
  // }

  // Add marker function
  function addMarker(props) {
    let marker = new google.maps.Marker({
      position: props.coords,
      map: map
    });

    // Check for custom icon
    if (props.iconImage) {
      marker.setIcon(props.iconImage);
    }

    // Check content
    if (props.content) {
      // Add title
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    }
  }

  // Create the search box and link it to the UI element.
  const input = document.getElementById("search");
  const searchBox = new google.maps.places.SearchBox(input);
  //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });
  let markers = [];

  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location,
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
