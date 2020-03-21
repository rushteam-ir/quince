function productModal(){

}



$(document).ready(function(){
    $('.slick-field').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slick-field-1',
        autoplay:false,
      });
      $('.slick-field-1').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slick-field',
        autoplay:false,
        focusOnSelect: true,
        autoplaySpeed: 2000,
        arrows:false,
      });
              
  });
      