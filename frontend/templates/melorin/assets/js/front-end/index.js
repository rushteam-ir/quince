// product slider

var swiper = new Swiper('.swiper-container', {
  slidesPerView: 4,
});

// headerslider


var swiper = new Swiper('.main_slider', {
  slidesPerView: 1,
  pagination: {
    el: '.main_slider_pagination',
    type: 'progressbar',
  },
  navigation: {
    nextEl: '.main_slider_next',
    prevEl: '.main_slider_prev',
  },
});