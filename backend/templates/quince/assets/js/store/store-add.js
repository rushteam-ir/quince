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

$('#product_Percent, #product_sale ,#product_price').keyup(function () {

    if (this.value.slice(-1).match(/^[0-9]+\.?[0-9]*$/)) {

        var a = this.value.replace(/\./g, '').split('').reverse();

        var pos = 3;
        while (a[pos] !== undefined) {

            a.splice(pos, 0, '.');
            pos = pos + 4;

        }

        this.value = a.reverse().join('');

    }

});


// select procduct type 

$('.select_procut_type').change(function () {

    let selected = $('.select_procut_type').find(":selected").text();

    if (selected == 'مجازی' || selected == 'قابل دانلود') {

        $('#pro_Appearance').css('display', 'none');

    } else {

        $('#pro_Appearance').css('display', 'block');

    }

});

// btn to add layer to attr tabs
let cont = 1
$('.add_layer').click(function () {

    if (cont >= 30) {

        temp = '';

    }

    let temp = '<div class="row"><div class="col-3"><div class="form-group">';
    temp += ' <label>نام</label> <input type="text" class="form-control main_form_design" id="attr_name"> </div></div>';
    temp += '<div class="col-9"><div class="form-group"><label>توضیحات</label>';
    temp += '<textarea class="form-control main_form_design attr_description_field" id="attr_description"></textarea>';
    temp += '</div></div></div>';

    $('.add_layer').prev().append(temp);
    cont += 1;

});