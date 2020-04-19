// product slider

var swiper = new Swiper('.main_product_swiper', {
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


var swiper = new Swiper('.main_slider', {
  slidesPerView: 1,
  effect: 'fade',
  pagination: {
    el: '.main_slider_pagination',
    type: 'progressbar',
  },
  navigation: {
    nextEl: '.main_slider_next',
    prevEl: '.main_slider_prev',
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});