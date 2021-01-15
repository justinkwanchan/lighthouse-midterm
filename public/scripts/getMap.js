let map;

$(() => {
  const getMap = function () {

    $("nav").find("#search").addClass("visibility-off");

    // The data from user_data.ejs
    let $name = $(".pins-name");
    let $lat = $(".pins-lat");
    let $lng = $(".pins-lng");
    let $description = $(".pins-description");
    let $image = $(".pins-image");

    // Calculate average of co-ordinates
    let arrayOfLat = [];
    let arrayOfLng = [];
    for (let i = 0; i < $name.length; i++) {
      arrayOfLat.push(Number($lat[i].defaultValue));
      arrayOfLng.push(Number($lng[i].defaultValue));
    }
    let avgLat = (arrayOfLat.reduce((a, b) => a + b, 0))/arrayOfLat.length;
    let avgLng = (arrayOfLng.reduce((a, b) => a + b, 0))/arrayOfLng.length;

    const coords = { lat: avgLat, lng: avgLng };
    // Map options
    let options = {
      zoom: 10,
      center: coords
    };

    // The map, centered at average of co-ordinates
    map = new google.maps.Map(document.getElementById("map"), options);

    for (let i = 0; i < $name.length; i++) {
      // console.log($name[i].defaultValue);
      // console.log(Number($lat[i].defaultValue));

      let latLng = { lat: Number($lat[i].defaultValue), lng: Number($lng[i].defaultValue) };
      let marker = {coords: latLng, content: $name[i].defaultValue};
      if ($image[i].defaultValue === "cafe") {
        marker.iconImage = "../images/free_breakfast-24px.svg";
      } else if ($image[i].defaultValue === "restaurant") {
        marker.iconImage = "../images/food_bank-24px.svg";
      } else if ($image[i].defaultValue === "sports") {
        marker.iconImage = "../images/sports_soccer-24px.svg";
      } else if ($image[i].defaultValue === "bar") {
        marker.iconImage = "../images/sports_bar-24px.svg";
      }

      addMarker(marker);
    }
  }
  // Add marker function
  const addMarker = function (props) {

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

    return marker;
  }

  getMap();
});
