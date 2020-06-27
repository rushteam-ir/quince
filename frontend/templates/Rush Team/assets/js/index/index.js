// header slider
$(document).ready(function () {

  let header_slider = new Swiper('.header_slider', {

    speed: 600,
    parallax: true,
    pagination: {

      el: '.heager_pagination',
      clickable: true,

    },

    navigation: {

      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',

    },

  });


  // article slider
  let article_slider = new Swiper('.article_slider', {

    slidesPerView: 3,
    spaceBetween: 30,
    speed: 1000,

    autoplay: {

      delay: 2500,
      disableOnInteraction: false,

    },

  });

  // work_level js



  $(document).on('click', '.POW_col_template', function () {

    $('.POW_col_template').removeClass('active_template');
    $(this).addClass('active_template');
    $('.POW_col_template').next().fadeOut();
    $(this).next().fadeIn();

  });

});

//service part

