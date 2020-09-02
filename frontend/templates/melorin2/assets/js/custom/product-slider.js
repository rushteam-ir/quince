
//product slider

var swiper = new Swiper('.swiper_slider_product', {
    slidesPerView: 1,
    spaceBetween: 0,
    slidesPerGroup: 1,
    loop: false,
    loopFillGroupWithBlank: true,

    navigation: {
        nextEl: '.product_arrow_next',
        prevEl: '.product_arrow_prev',
    },
    breakpoints: {
        400:{
            slidesPerView: 1,
            spaceBetween: 0,
        },
        500:{
            slidesPerView: 2,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 3,
        },
        1200: {
            slidesPerView: 4,
        },
    }
});
