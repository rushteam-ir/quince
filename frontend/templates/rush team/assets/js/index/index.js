var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

new WOW().init();

var typed = new Typed('#MW_typed', {
    strings: ["برترین نمونه کار های ما را در بالا میتوانید مشاهده کنید . " , "برای مشاهده نمونه کار های بیشتر ب روی دکمه روبرو کلیک کنید . "],
    typeSpeed: 30,
    backSpeed: 20,
    loop: true
});