$(document).ready(function() {
  // $('#test').on('click', function(event) {
  //   event.preventDefault();
  //   $(this).parent().parent().parent().addClass("form-animate-left");
  // });

  $('#test').on('click', function(event) {
    // event.preventDefault();
    $('#sign-up-screen').css('visibility', 'visible');
    $('#form').addClass("form-animate-left");
    $('#form').removeClass("form-animate-right");
    setTimeout(function() {
      $('#login-screen').css('visibility', 'hidden');
    }, 400);
  });

  $('#test2').on('click', function(event) {
    // event.preventDefault();
    $('#login-screen').css('visibility', 'visible');
    $('#form').addClass("form-animate-right");
    $('#form').removeClass("form-animate-left");
    setTimeout(function() {
      $('#sign-up-screen').css('visibility', 'hidden');
    }, 400);
  });
});
