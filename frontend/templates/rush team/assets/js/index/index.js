new WOW().init();

var typed = new Typed('#MW_typed', {
    strings: ["برترین نمونه کار های ما را در بالا میتوانید مشاهده کنید . ", "برای مشاهده نمونه کار های بیشتر ب روی دکمه روبرو کلیک کنید . "],
    typeSpeed: 30,
    backSpeed: 20,
    loop: true
});

var MWE = document.getElementById('MWE_parallax');
new simpleParallax(MWE, {
    scale: 1.1,
    orientation: 'right',
    delay: 10,
    transition: 'cubic-bezier(0,0,0,10)',
});

$('.header_img').parallax({
    imageSrc: 'img/header.jpg'
});

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 0,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});