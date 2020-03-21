var product_modal_id = document.getElementById('product_modal_id');
  
  function productModal(){

    product_modal_id.style.display = "block";

    new WOW().init();

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
  
          slidesToShow: 2,
          slidesToScroll: 1,
          asNavFor: '.slick-field',
          autoplay:false,
          focusOnSelect: true,
          autoplaySpeed: 2000,
          arrows:false,
          centerMode: true,
  
        });
                
    });

  }

  function removeModal(){
    product_modal_id.style.display = "none";
  }