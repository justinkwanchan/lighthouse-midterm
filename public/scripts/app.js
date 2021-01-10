$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
// Initialize and add the map
function initMap() {
  // The location of Niagra
  const niagra = { lat: 43.08819077186206, lng: -79.07223055850586 };
  // Locations of coffee shops in Niagra
  const coffee_shop_1 = { lat: 43.0958356243389, lng: -79.07055451075264 };
  const coffee_shop_2 = { lat: 43.08278060767427, lng: -79.08079415535241 };
  const coffee_shop_3 = { lat: 43.08995795769985, lng: -79.095385372843 };

  // Map options
  var options = {
    zoom: 12,
    center: niagra
  };

  // The map, centered at Niagra
  var map = new google.maps.Map(document.getElementById("map"), options);

  // Array of markers
  var markers = [
    {coords:coffee_shop_1, iconImage: "../images/free_breakfast-24px.svg", content: '<h2>Italian Ice Cream</h2>'},
    {coords:coffee_shop_2, iconImage: "../images/free_breakfast-24px.svg", content: '<h2>Tim Hortons</h2>'},
    {coords:coffee_shop_3, iconImage: "../images/free_breakfast-24px.svg", content: '<h2>Starbucks</h2>'}
  ];

  // Loop markers
  for (const values of markers) {
    addMarker(values);
  }

  // Add marker function
  function addMarker(props) {
    var marker = new google.maps.Marker({
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

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      });
    }
  }
}
