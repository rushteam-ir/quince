// sweet alert
$('.product_del').on('click', function (e) {

    let product_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف محصول',
        text: "آیا از حذف این محصول مطمئن هستید ؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title : 'حذف شد',
                text : 'محصول مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon : 'success',
                confirmButtonText: 'تایید',
            }).then((result)=>{
                if (result.value) {
                    redirect(`${backend_url}store/?del=${product_id}`);
                }
            })
        }
    })
});

function redirect(url) {
    location.href = url
}

// modal slider
  $(document).ready(function(){
    $('.main_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav',
        autoplay:true
      });
      $('.slider-nav').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.main_slider',
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        arrows:false
      });
  });


function calculatePoints(points){

    let division = Math.round(parseInt(points));

    if(division == 0){
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
    }
    else if(division == 1){
        $( ".star" ).append( `<i class="fas fa-star-half-alt half_star_custome"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);

    }
    else if(division == 2){
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
    }
    else if(division == 3){
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star-half-alt half_star_custome"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
    }
    else if(division == 4){
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
    }
    else if(division == 5){
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star-half-alt half_star_custome"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
    }
    else if(division == 6){
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
    }
    else if(division == 7){
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star-half-alt half_star_custome"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
    }
    else if(division == 8){
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="far fa-star"></i>`);
    }
    else if(division == 9){
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star-half-alt half_star_custome"></i>`);
    }
    else if(division == 10){
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
        $( ".star" ).append( `<i class="fas fa-star"></i>`);
    }
};