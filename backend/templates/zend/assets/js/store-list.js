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

        let round_points = Math.round(parseInt(points));

        if(round_points == 0){
            $("#star_1").removeAttr('class').attr('class', 'far fa-star');
            $("#star_2").removeAttr('class').attr('class', 'far fa-star');
            $("#star_3").removeAttr('class').attr('class', 'far fa-star');
            $("#star_4").removeAttr('class').attr('class', 'far fa-star');
            $("#star_5").removeAttr('class').attr('class', 'far fa-star');
        }
        else if(round_points == 1){
            $("#star_1").removeAttr('class').attr('class', 'fas fa-star-half-alt half_star_custome');
            $("#star_2").removeAttr('class').attr('class', 'far fa-star');
            $("#star_3").removeAttr('class').attr('class', 'far fa-star');
            $("#star_4").removeAttr('class').attr('class', 'far fa-star');
            $("#star_5").removeAttr('class').attr('class', 'far fa-star');
        }
        else if(round_points == 2){
            $("#star_1").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_2").removeAttr('class').attr('class', 'far fa-star');
            $("#star_3").removeAttr('class').attr('class', 'far fa-star');
            $("#star_4").removeAttr('class').attr('class', 'far fa-star');
            $("#star_5").removeAttr('class').attr('class', 'far fa-star');
        }
        else if(round_points == 3){
            $("#star_1").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_2").removeAttr('class').attr('class', 'fas fa-star-half-alt half_star_custome');
            $("#star_3").removeAttr('class').attr('class', 'far fa-star');
            $("#star_4").removeAttr('class').attr('class', 'far fa-star');
            $("#star_5").removeAttr('class').attr('class', 'far fa-star');
        }
        else if(round_points == 4){
            $("#star_1").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_2").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_3").removeAttr('class').attr('class', 'far fa-star');
            $("#star_4").removeAttr('class').attr('class', 'far fa-star');
            $("#star_5").removeAttr('class').attr('class', 'far fa-star');
        }
        else if(round_points == 5){
            $("#star_1").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_2").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_3").removeAttr('class').attr('class', 'fas fa-star-half-alt half_star_custome');
            $("#star_4").removeAttr('class').attr('class', 'far fa-star');
            $("#star_5").removeAttr('class').attr('class', 'far fa-star');
        }
        else if(round_points == 6){
            $("#star_1").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_2").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_3").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_4").removeAttr('class').attr('class', 'far fa-star');
            $("#star_5").removeAttr('class').attr('class', 'far fa-star');
        }
        else if(round_points == 7){
            $("#star_1").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_2").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_3").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_4").removeAttr('class').attr('class', 'fas fa-star-half-alt half_star_custome');
            $("#star_5").removeAttr('class').attr('class', 'far fa-star');
        }
        else if(round_points == 8){
            $("#star_1").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_2").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_3").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_4").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_5").removeAttr('class').attr('class', 'far fa-star');
        }
        else if(round_points == 9){
            $("#star_1").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_2").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_3").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_4").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_5").removeAttr('class').attr('class', 'fas fa-star-half-alt half_star_custome');
        }
        else if(round_points == 10){
            $("#star_1").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_2").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_3").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_4").removeAttr('class').attr('class', 'fas fa-star');
            $("#star_5").removeAttr('class').attr('class', 'fas fa-star');
        }

};