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
  // The location of Uluru
  const uluru = { lat: 43.08819077186206, lng: -79.07223055850586 };
  // Map options
  var options = {
    zoom: 8,
    center: uluru
  };
  // The map, centered at Uluru
  var map = new google.maps.Map(document.getElementById("map"), options);
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: "../images/free_breakfast-24px.svg"
  });
}
