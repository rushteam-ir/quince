// chose file customize
(function () {

    $('.input-file-custom').each(function () {
        var $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();
    });

})();
$(document).ready(function () {

    // show img when browse
    $(".input-file-custom").change(function () {

        let input = this;

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {

                let fieldHTML = '<div class="remove_parent"><img class="uploading_img_from_brows" src="' + e.target.result + '"> <div class="remove_img_icon remove"></div></div>';
                $(input).prev().append(fieldHTML);

            }

            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }

    });

});

$(document).on('click', '.remove', function (e) {

    $(this).parents('.img-show').next().val('');
    $(this).parent('.remove_parent').remove();

});

// pop over function

$(function () {
    $('[data-toggle="popover"]').popover()
})

$(document).on('change', '.width_inp_customize', function(e) {

    let index = parseInt($(this).attr('id')) + 1;

    if($(this).val() != ''){

        $('.features_class_' + index.toString()).removeAttr('disabled', 'disabled');

    }
    else{

        for(let i = index; i < 4; i++){

            $('.features_class_' + i.toString()).attr('disabled', 'disabled');
            $('.features_class_' + i.toString()).val('');

        }

    }

});

// errors

function storeAddError() {

    $('.alert_query').remove();

    var error_field = document.getElementById('error_field_warning_front');
    var error_text = document.getElementById('error_text');

    var title_inp = document.forms['store_add_form']['title_inp'].value;
    var parent_inp = document.forms['store_add_form']['parent_inp'].value;
    var child_inp = document.forms['store_add_form']['child_inp'].value;
    var describe_inp = document.forms['store_add_form']['describe_inp'].value;
    var price_inp = document.forms['store_add_form']['price_inp'].value;
    var stock_inp = document.forms['store_add_form']['stock_inp'].value;
    var discount_inp = document.forms['store_add_form']['discount_inp'].value;
    var product_img_main = document.forms['store_add_form']['product_img_main'].value;

    if (title_inp == "" || parent_inp == "" || child_inp == "" || describe_inp == "" || price_inp == "" || stock_inp == "" || discount_inp == "") {

        scrollTop()
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا تمام فیلد ها را پر کنید.";
        return false;

    }else if (product_img_main == "") {

        scrollTop()
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا تصویر اصلی محصول را بارگذاری نمایید."
        return false;

    } else if (isNaN(price_inp)) {

        scrollTop()
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا قیمت کالا را درست وارد کنید."
        return false;

    } else if (isNaN(stock_inp)) {

        scrollTop()
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا موجودی انبار را درست وارد کنید."
        return false;

    } else if (isNaN(discount_inp)) {

        scrollTop()
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا تخفیف را درست وارد کنید."
        return false;

    } else if (discount_inp > 100) {

        scrollTop()
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا مقدار تخفیف را درست وارد کنید."
        return false;

    }

}
