

//slick slider

$(document).ready(function(){
    $('.slick_slider_for_product').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    slidesToShow: 1
                }
            }
        ]
    });
});