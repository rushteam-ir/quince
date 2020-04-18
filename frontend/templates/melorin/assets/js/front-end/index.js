// product slider

var swiper = new Swiper('.main_product_swiper', {
  slidesPerView: 4,
  navigation: {
    nextEl: '.product_arrow_next',
    prevEl: '.product_arrow_prev',
  },
});

// headerslider


var swiper = new Swiper('.main_slider', {
  slidesPerView: 1,
  effect: 'fade',
  loop: true,
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