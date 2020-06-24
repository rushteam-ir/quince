// swiper option

var header_slider = new Swiper('.header_slider', {

  speed: 600,
  parallax: true,
  pagination: {

    el: '.swiper-pagination',
    clickable: true,

  },

  navigation: {

    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',

  },

});

var article_slider = new Swiper('.article_slider', {

  slidesPerView: 3,
  spaceBetween: 30,

  pagination: {

    el: '.swiper-pagination',
    clickable: true,

  },

  autoplay: {

    delay: 2500,
    disableOnInteraction: false,

  },

});


// service js

$(document).ready(function () {

  $(document).on('click', '.service_col_template', function () {

    $('.service_col_template').removeClass('active_template');
    $(this).addClass('active_template');
    $('.service_col_template').next().fadeOut();
    $(this).next().fadeIn();

  });

});