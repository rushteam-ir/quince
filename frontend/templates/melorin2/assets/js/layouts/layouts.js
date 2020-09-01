$(document).ready(function () {

    $('.nav_btn_responsive').click(function () {
        $('.layer_of_nav').fadeIn();
        $('.nav_bar_responsive').animate({display:'block',right: '0px'});
    });

    $('.btn_close').click(function () {
        $('.layer_of_nav').fadeOut();
        $('.nav_bar_responsive').animate({right: '-350px',display:'none'});
    });


    $(window).resize(function () {
        if ( $(window).width()>991 ){
            $('.layer_of_nav').css('display','none');
        }
    });
    
});

