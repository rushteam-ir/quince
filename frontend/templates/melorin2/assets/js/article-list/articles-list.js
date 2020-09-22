filterSelection("all");

function filterSelection(type) {

    for (let i = 0; i < $('.col_style').length; i++) {

        if ($('.col_style').eq(i).hasClass(type)) {

            $('.col_style').eq(i).addClass('show');

        }else{

            $('.col_style').eq(i).removeClass('show');

            if (type === "all") {

                $('.col_style').eq(i).addClass('show');

            }

        }
    }
}



    for (let i = 0; i < $('.btn_filter').length; i++) {

        $('.btn_filter').eq(i).click(function () {

            $('.btn_filter').removeClass('active');
            $(this).addClass('active');

        });

    }




