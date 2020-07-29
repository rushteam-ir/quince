var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 20,
    freeMode: true,
    breakpoints: {
        1200:{
            slidesPerView: 4,
            spaceBetween: 30,
        },
        991:{
            slidesPerView: 3,
            spaceBetween: 40,
        },
        767:{
            slidesPerView: 2,
            spaceBetween: 50,
        },
        600:{
            slidesPerView: 2,
            spaceBetween:10,
        },
    }
});