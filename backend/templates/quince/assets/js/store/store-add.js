// change tabs 

let store_tabs = $('.shop_tabs');
let input_tabs = $('.field_of_shop_tabs');

for (let i = 0; i <= store_tabs.length; i++) {

    store_tabs.eq(i).click(function () {

        for (let j = 0; j < input_tabs.length; j++) {

            input_tabs.eq(j).hide();
            store_tabs.eq(j).removeClass('shop_tabs_active');

        }

        input_tabs.eq(i).fadeIn();
        store_tabs.eq(i).addClass('shop_tabs_active');


    });

}

// place dot after type number 

// $('#product_Percent, #product_sale ,#product_price').keyup(function () {

//     if (this.value.slice(-1).match(/^[0-9]+\.?[0-9]*$/)) {

//         var a = this.value.replace(/\./g, '').split('').reverse();

//         var pos = 3;
//         while (a[pos] !== undefined) {

//             a.splice(pos, 0, '.');
//             pos = pos + 4;

//         }

//         this.value = a.reverse().join('');

//     }

// });

// sale price calculate
// when main price and sale price changed , percent input changed

let percent = 0
let sale = 0

$('#product_price , #product_sale ').change(function(){

    let product_price = $('#product_price').val();
    let product_sale = $('#product_sale').val();


    if(product_price !== '' && product_sale !== ''){

        percent = 100 * product_sale / product_price ; 
        $('#product_Percent').val(percent.toFixed(1));


    }

});

// when percent changed sale price changed to
$('#product_Percent').change(function(){

    let product_price = $('#product_price').val();
    let product_Percent = $('#product_Percent').val();

    sale = product_Percent * product_price / 100;
    $('#product_sale').val(sale);

});


// select procduct type 

$('.select_procut_type').change(function () {

    let selected = $('.select_procut_type').find(":selected").text();

    if (selected == 'مجازی') {

        $('#pro_Appearance').css('display', 'none');
        $('#video_upload').css('display', 'none');

    } else if (selected == 'قابل دانلود') {

        $('#video_upload').css('display', 'block');
        $('#pro_Appearance').css('display', 'none');

    } else if (selected == 'فیزیکی') {

        $('#pro_Appearance').css('display', 'block');
        $('#video_upload').css('display', 'none');

    }

});

// btn to add layer to attr tabs
let cont = 1
$('.add_layer').click(function () {

    if (cont >= 30) {

        temp = '';

    }

    let temp = '<div class="row add_layer_box"><div class="col-3 pr-0"><div class="form-group">';
    temp += ' <label>نام</label> <input type="text" class="form-control main_form_design" id="attr_name"> </div></div>';
    temp += '<div class="col-9 pl-0"><div class="form-group"><label>توضیحات</label>';
    temp += '<textarea class="form-control main_form_design attr_description_field" id="attr_description"></textarea>';
    temp += '</div></div></div>';

    $('.add_layer').prev().append(temp);
    cont += 1;

    $('.remove_layer').css('display', 'block');

});

// remove layer from attr tabs
$('.remove_layer').click(function () {

    $('.add_layer_box:last-child').remove();


    if ($('.add_layer_box').length == 0) {

        $('.remove_layer').css('display', 'none');

    }

});



// btn to add video uploader to video_uploader tabs

let cont2 = 1
$('.add_video_uploader').click(function () {

    if (cont2 >= 30) {

        let temp = '';

    }

    temp = '<div class="row row_UV_custom"><div class="col-6 pr-0"><div class="form-group "><label>نام فایل</label>';
    temp += '<input type="text" class="form-control main_form_design"></div></div><div class="col-6 pl-0">';
    temp += '<div class="form-group position-relative"><label>اپلود فایل</label>';
    temp += '<input type="file" class="form-control chose_file_inp main_form_design fal ajax_file" name="main_image"></div>';
    temp += '</div><div class="col-12 p-0"><div class="form-group"><label>توضیحات فایل</label> <textarea class="form-control main_form_design video_descript"></textarea></div></div></div>';

    $('.add_video_uploader').prev().append(temp);
    cont2 += 1;

    $('.remove_video_uploader').css('display', 'block');

});


// remove layer from video_uploader tabs
$('.remove_video_uploader').click(function () {

    $('.row_UV_custom:last-child').remove();


    if ($('.row_UV_custom').length == 0) {

        $('.remove_video_uploader').css('display', 'none');

    }

});

