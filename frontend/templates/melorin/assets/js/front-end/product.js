//

let current = document.getElementById('current');
let thumbnails = document.querySelectorAll('.thumb');
let explain_id=  document.getElementById('explain');
let further_explain_id=  document.getElementById('further_explain');
let comments_product_id=  document.getElementById('comments_product');
let add_comments_id=  document.getElementById('add_comments');


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


//ex
function explain() {
    sessionStorage.text=1;
    explain_id.style.display = "block";
    further_explain_id.style.display = "none";
    comments_product_id.style.display = "none";
    add_comments_id.style.display = "none";
}

function further_explain() {
    sessionStorage.text=2;
    explain_id.style.display = "none";
    further_explain_id.style.display = "block";
    comments_product_id.style.display = "none";
    add_comments_id.style.display = "none";
}

function comments_product() {
    sessionStorage.text=3;
    explain_id.style.display = "none";
    further_explain_id.style.display = "none";
    comments_product_id.style.display = "block";
    add_comments_id.style.display = "none";
}

function add_comments() {
    sessionStorage.text=4;
    explain_id.style.display = "none";
    further_explain_id.style.display = "none";
    comments_product_id.style.display = "none";
    add_comments_id.style.display = "block";
}


if (sessionStorage.text==1){
    explain();
}
else if (sessionStorage.text==2){
    further_explain();
}

else if (sessionStorage.text==3){
    comments_product();
}
else {
    add_comments();
}