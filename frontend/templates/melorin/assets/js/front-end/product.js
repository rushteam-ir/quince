//

let current = document.getElementById('current');
let thumbnails = document.querySelectorAll('.thumb');


thumbnails.forEach( (e)=> {
    e.addEventListener('click',  ()=> {
        let getsrc = e.getAttribute('src');
        current.setAttribute('src',getsrc);
    });
});


//Similar Product Slider

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

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


