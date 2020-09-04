$(document).ready(function () {

    $('.icon_link_eye').click(function () {
        $('.modal_fast_see').fadeIn();
    });
    $('.btn_close').click(function () {
        $('.modal_fast_see').fadeOut();
    })
});

//swiper

var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 12,
    slidesPerView: 4,
    loop: false,
    freeMode: true,
    loopedSlides: 4, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
});
var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 0,
    loop: true,
    loopedSlides: 4, //looped slides should be the same
    thumbs: {
        swiper: galleryThumbs,
    },
});