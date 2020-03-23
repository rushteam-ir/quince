//modal search function

var myOverlay = document.getElementById("myOverlay");
var new_product_click = document.getElementById("new_product_click");
var best_product_click = document.getElementById("best_product_click");

function openSearch() {

    myOverlay.style.display = "block";

}

function closeSearch() {

    myOverlay.style.display = "none";

}

//click on new or best product function

function clickOnBottom1() {

    sessionStorage.text = 1;
    new_product_click.style.display = "block";
    best_product_click.style.display = "none";

    $(document).ready(function () {

        $('.slider_new_product').slick({

            infinite: true,
            dots: false,
            arrows: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [{

                    breakpoint: 1024,
                    settings: {

                        slidesToShow: 3,
                        slidesToScroll: 1,

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

}

function clickOnBottom2() {

    sessionStorage.text = 2;
    new_product_click.style.display = "none";
    best_product_click.style.display = "block";

    $(document).ready(function () {

        $('.slider_best_product').slick({

            dots: false,
            infinite: true,
            arrows: false,
            speed: 300,
            slidesToShow: 5,
            slidesToScroll: 1,
            responsive: [{

                    breakpoint: 1024,
                    settings: {

                        slidesToShow: 3,
                        slidesToScroll: 1,
                        
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
}


if (sessionStorage.text == 1) {

    clickOnBottom1();

} else {

    clickOnBottom2();

}