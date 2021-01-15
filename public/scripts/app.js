$(() => {
  // $.ajax({
  //   method: "GET",
  //   url: "/api/users"
  // }).done((users) => {
  //   for(user of users) {
  //     $("<div>").text(user.name).appendTo($("body"));
  //   }
  // });
  // Initialize and add the map
  const initMap = function() {
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

    $(".form-pins").find(".submit-button").addClass("hide-button");
    $(".form-pins").find(".pins-list").addClass("hide-button");

    let pinCount = 0;

    // Listen for click on map
    google.maps.event.addListener(map, 'click',
      function (event) {
        pinCount++;

        // Add marker
        addMarker({ coords: event.latLng });
        // Display latitude and longitude of current marker
        console.log(JSON.stringify(event.latLng.toJSON()));
        let lat = JSON.stringify(event.latLng.toJSON().lat);
        let lng = JSON.stringify(event.latLng.toJSON().lng);
        $("#pins").append(createForm(lat, lng, pinCount));
        $(".form-pins").find(".pins-list").removeClass("hide-button");
        $(".form-pins").find(".submit-button").removeClass("hide-button");
        $(".form-pins").addClass("pin-info-show");
        $(".form-pins").removeClass("pin-info-hide");
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
        let infoWindow = new google.maps.InfoWindow({
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

    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
    let infoWindow = new google.maps.InfoWindow();
    const locationButton = document.createElement("button");
    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("geolocation");
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent("Location found.");
            infoWindow.open(map);
            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }
    });
  }
  initMap();
  const createForm = function (latitude, longitude, pinCount) {
    let $form = $(`
      <div class="pin-data">
      <h3>#${pinCount}</h3>
      <div class="pin-title">
        <label for="pins-name">Title</label>
        <input type="text" name="pins-name">
      </div>
      <div class="pin-description">
        <label for="pins-name">Description</label>
        <textarea class="pin-description-textarea" name="pins-desc"></textarea>
      </div>
      <div class="pin-image">
        <label for="cars">Icon</label>
        <select name="pins-icon">
          <option value="cafe">☕</option>
          <option value="restaurant">🍴</option>
          <option value="bar">🍺</option>
          <option value="sports">️⚽️</option>
        </select>
      </div>
      <input type="hidden" id="pins-lat" name="pins-lat" value=${latitude}>
      <input type="hidden" id="pins-lng" name="pins-lng" value=${longitude}>
    `);
    return $form;
  };

  // < div >
  // </div>
  // <label for="pins-lat">Lat: ${latitude}</label>
  // <div>
  // <label for="pins-lng">Lng: ${longitude}</label>
  // </div>

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
});
