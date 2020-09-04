$(document).ready(function () {

    //register modal

    $('.sign_btn').click(function () {
        $('body').css('overflow','hidden');
        $('#modal_register').fadeIn();
        $('#modal_login').fadeOut();


    });

    $('.btn_close').click(function () {
        $('body').css('overflow','auto');
        $('#modal_register').fadeOut();
        $('#modal_login').fadeOut();
        $('#modal_recovery').fadeOut();
    });

    $('.register_link').click(function () {
        $('#modal_register').fadeOut();
        $('#modal_login').fadeIn();
        $('#modal_recovery').fadeOut();
    });

    $('.login_link').click(function () {
        $('#modal_register').fadeIn();
        $('#modal_login').fadeOut();

    });

    $('.recovery_link').click(function () {
        $('#modal_recovery').fadeIn();
        $('#modal_login').fadeOut();
    })
});

