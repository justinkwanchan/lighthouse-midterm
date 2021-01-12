$(document).ready(function() {

  // Switches the login form to sign up form
  $('#switch-to-sign-up').on('click', function(event) {
    $('#sign-up-screen').removeClass('form-hidden');
    $(this).parent().parent().parent().addClass("form-animate-left");
    $(this).parent().parent().parent().removeClass("form-animate-right");
    setTimeout(function() {
      $('#login-screen').addClass('form-hidden');
    }, 400);
  });

  // Switches the sign up form to login form
  $('#switch-to-login').on('click', function(event) {
    $('#login-screen').removeClass('form-hidden');
    $(this).parent().parent().parent().addClass("form-animate-right");
    $(this).parent().parent().parent().removeClass("form-animate-left");
    setTimeout(function() {
      $('#sign-up-screen').addClass('form-hidden');
    }, 400);
  });

  // Displays the login form overlay - closes it upon mouse click outside the form
  $('#login-button').on('click', function(event) {
    event.stopPropagation();

    $('#login-overlay').removeClass("overlay-remove");
    $('#login-overlay').addClass("overlay-display");

    $(document.body).on('click', function(event) {
      $('#login-overlay').addClass("overlay-remove");
      $('#login-overlay').removeClass("overlay-display");
    });

    $("#login-overlay").on('click', function(event) {
      event.stopPropagation();
    });
  });
});
