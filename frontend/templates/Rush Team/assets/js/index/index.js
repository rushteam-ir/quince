// swiper option

var swiper = new Swiper('.swiper-container', {
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



// service js

$(document).ready(function(){

  $(document).on('click','.service_col_template',function(){

    $('.service_col_template').removeClass('active_template');
    $(this).addClass('active_template');
    $('.service_col_template').next().removeClass('active_text');
    $(this).next().addClass('active_text');

  });

});

