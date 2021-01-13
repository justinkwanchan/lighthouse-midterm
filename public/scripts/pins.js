$(document).ready(function() {
  $('button').on('click', function(event) {
    console.log('test');
    event.preventDefault();
    $('.dropdown-content').addClass('.show');
  });

  // $('#pins').on('click', function(event) {
  //   event.preventDefault();
  //   console.log('test');
  //   $('.dropdown-content').addClass('.show');
  // });

});
