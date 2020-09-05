$(document).ready(function () {

    // sticky navbar
    $(document).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll) {
            $('.bottom_box_of_nav_bar').addClass('sticky');
        } else {
            $('.bottom_box_of_nav_bar').removeClass('sticky');
        }
    });

    //nav bar btn
    $('.nav_btn_responsive').click(function () {
        $('.layer_of_nav').fadeIn();
        $('.nav_bar_responsive').animate({display:'block',right: '0px'});
    });

    //close nav bar btn
    $('.btn_close').click(function () {
        $('.layer_of_nav').fadeOut();
        $('.nav_bar_responsive').animate({right: '-350px',display:'none'});
    });

    $(window).on('resize',function () {
        if ($(window).width() >= 991){
            $('.layer_of_nav').fadeOut();
        }
    })

});

