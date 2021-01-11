$(document).ready(function() {
  $('#switch-to-sign-up').on('click', function(event) {
    $('#sign-up-screen').removeClass('form-hidden');
    $(this).parent().parent().parent().addClass("form-animate-left");
    $(this).parent().parent().parent().removeClass("form-animate-right");
    setTimeout(function() {
      $('#login-screen').addClass('form-hidden');
    }, 400);
  });

  $('#switch-to-login').on('click', function(event) {
    $('#login-screen').removeClass('form-hidden');
    $(this).parent().parent().parent().addClass("form-animate-right");
    $(this).parent().parent().parent().removeClass("form-animate-left");
    setTimeout(function() {
      $('#sign-up-screen').addClass('form-hidden');
    }, 400);
  });
});
