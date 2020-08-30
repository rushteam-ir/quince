//main slider

var swiper = new Swiper('.main_slider', {
    spaceBetween: 30,
    effect: 'fade',
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.next_main_btn',
        prevEl: '.prev_main_btn',
    },
});




//product slider

var swiper = new Swiper('.swiper_slider_product', {
    slidesPerView: 4,
    spaceBetween: 0,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,

    navigation: {
        nextEl: '.product_arrow_next',
        prevEl: '.product_arrow_prev',
    },
});