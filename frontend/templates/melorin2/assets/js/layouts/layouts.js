$(document).ready(function () {

    $('.nav_btn_responsive').click(function () {
        $('.layer_of_nav').fadeIn();
    });

    $('.btn_close').click(function () {
        $('.layer_of_nav').fadeOut();
    });


    $(window).resize(function () {
        if ( $(window).width()>991 ){
            $('.layer_of_nav').css('display','none');
        }
    });
    
});

