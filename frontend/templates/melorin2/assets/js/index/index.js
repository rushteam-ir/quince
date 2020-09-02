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





//parallax

$('.parallax-window').parallax({imageSrc: "../../img/parallax.jpg"});