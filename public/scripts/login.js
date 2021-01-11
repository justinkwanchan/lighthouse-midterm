$(document).ready(function() {
  $('#test').on('click', function(event) {
    // event.preventDefault();
    console.log($(this).parent().parent());
    console.log($('#login-screen'));
    // console.log($(this).parent().parent().parent());
    // console.log($('#form'));
    // $('#sign-up-screen').css('visibility', 'visible');
    $('#sign-up-screen').removeClass('form-hidden');
    $(this).parent().parent().parent().addClass("form-animate-left");
    $(this).parent().parent().parent().removeClass("form-animate-right");
    setTimeout(function() {
      $('#login-screen').addClass('form-hidden');
    }, 400);
  });

  $('#test2').on('click', function(event) {
    // event.preventDefault();
    $('#login-screen').removeClass('form-hidden');
    $(this).parent().parent().parent().addClass("form-animate-right");
    $(this).parent().parent().parent().removeClass("form-animate-left");
    setTimeout(function() {
      $('#sign-up-screen').addClass('form-hidden');
    }, 400);
  });
});
