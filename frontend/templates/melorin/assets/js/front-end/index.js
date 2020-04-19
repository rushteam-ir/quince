// product slider

var product_swiper = new Swiper('.main_product_swiper', {
  slidesPerView: 4,
  navigation: {
    nextEl: '.product_arrow_next',
    prevEl: '.product_arrow_prev',
  },
  breakpoints: {
    0 : {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1200:{
      slidesPerView: 4,
    }
  }
});

// headerslider

var main_swiper = new Swiper('.main_slider', {
  slidesPerView: 1,
  loop:true,
  effect: 'fade',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

new WOW().init();