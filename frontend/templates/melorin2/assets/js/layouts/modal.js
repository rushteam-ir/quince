$(document).ready(function () {

    //register modal

    $('.sign_btn').click(function () {
        $('#modal_register').fadeIn();
        $('#modal_login').fadeOut();
    });

    $('.btn_close').click(function () {
        $('#modal_register').fadeOut();
        $('#modal_login').fadeOut();
    });

    $('.register_link').click(function () {
        $('#modal_register').fadeOut();
        $('#modal_login').fadeIn();
    });

    $('.login_link').click(function () {
        $('#modal_register').fadeIn();
        $('#modal_login').fadeOut();
    });
});

