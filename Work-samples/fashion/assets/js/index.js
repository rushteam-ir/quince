$('.bottom_of_menu_bar').click(function () {

    new WOW().init();

    $('#first_text_about_uniti').fadeOut();
    $('.bottom_of_menu_bar').fadeOut();
    $('.bottom_of_close').fadeIn(700);

    setTimeout(function () {

        $('.menu_options').show();

    }, 500);

});

$('.bottom_of_close').click(function () {

    $('.menu_options').fadeOut();

    setTimeout(function () {

        $('#first_text_about_uniti').fadeIn();

    }, 500);

    $('.bottom_of_close').fadeOut();
    $('.bottom_of_menu_bar').fadeIn();

});