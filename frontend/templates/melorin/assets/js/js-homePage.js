
//modal search function
function openSearch() {
    document.getElementById("myOverlay").style.display = "block";
}

function closeSearch() {
    document.getElementById("myOverlay").style.display = "none";
}

//click on new or best product function

function clickOnBottom1() {
    sessionStorage.text=1;
    document.getElementById("new_product_click").style.display = "block";
    document.getElementById("best_product_click").style.display = "none";
}

function clickOnBottom2() {
    sessionStorage.text=2;
    document.getElementById("new_product_click").style.display = "none";
    document.getElementById("best_product_click").style.display = "block";
}


if (  sessionStorage.text==1){
    clickOnBottom1();
}
else {
    clickOnBottom2();
}

//slider new product
$(document).ready(function(){

    $('.slider_new_product').slick({
        infinite: false,
        dots: false,
        arrows: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

//slider best product

$(document).ready(function(){

    $('.slider_best_product').slick({
        dots: false,
        infinite: false,
        arrows: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});