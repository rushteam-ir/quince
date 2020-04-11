// input add & remove
$(document).ready(function () {

    let maxField = 10;
    let addButton = $('.add_button');
    let wrapper = $('.field_wrapper');
    let fieldHTML = '<div class="col-6 p-0"><input class="form-control width_inp_customize" name="product_features_inp[]" type="text" value=""/><a href="javascript:void(0);" class="remove_button"><i class="fas fa-minus mt-2"></i></a></div>';
    let x = 1;

    $(addButton).click(function () {

        if (x < maxField) {

            x++;
            $(wrapper).append(fieldHTML);

        }

    });

    $(wrapper).on('click', '.remove_button', function (e) {

        e.preventDefault();
        $(this).parent('div').remove();
        x--;

    });

});


// chose file customize
(function () {

    $('.input-file-custom').each(function () {
        var $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();
    });

})();
$( document ).ready(function() {

    // show img when browse
    $(".input-file-custom").change(function() {

        let input = this;

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function(e) {

                let fieldHTML = '<div class="remove_parent"><img class="uploading_img_from_brows" src="'+e.target.result+'"> <div class="remove_img_icon remove"></div></div>';
                $(input).prev().append(fieldHTML);

            }

            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }

    });

});

$(document).on('click', '.remove', function(e) {

    $(this).parents('.img-show').next().val('');
    $(this).parent('.remove_parent').remove();

});

// pop over function

$(function () {
    $('[data-toggle="popover"]').popover()
})

// errors

function storeAddError(){

    $('.alert_query').remove();
 
    var error_field = document.getElementById('error_field_warning_front');
    var error_text = document.getElementById('error_text');

    // var title_inp = document.forms['store_add_form']['title_inp'].value;
    // var parent_inp = document.forms['store_add_form']['parent_inp'].value;
    // var child_inp = document.forms['store_add_form']['child_inp'].value;
    // var describe_inp = document.forms['store_add_form']['describe_inp'].value;
    // var price_inp = document.forms['store_add_form']['price_inp'].value;
    // var stock_inp = document.forms['store_add_form']['stock_inp'].value;
    // var discount_inp = document.forms['store_add_form']['discount_inp'].value;
    // var product_features_inp = document.forms['store_add_form']['product_features_inp[]'].value;
    // var product_img_main = document.forms['store_add_form']['product_img_main'].value;
    var product_other_images = document.forms['store_add_form']['product_other_images[]'].value;

    alert(product_other_images)

    // if(title_inp == "" || parent_inp == "" || child_inp == "" || describe_inp == "" || price_inp =="" || stock_inp == "" || discount_inp == ""){

    //     document.body.scrollTop = 0;
    //     document.documentElement.scrollTop = 0;
    //     error_field.style.display = "block";
    //     error_text.innerHTML = "لطفا تمام فیلد ها را پر کنید.";
    //     return false;

    // }

    // else if(product_features_inp == ""){

    //     document.body.scrollTop = 0;
    //     document.documentElement.scrollTop = 0;
    //     error_field.style.display = "block";
    //     error_text.innerHTML = "لطفا ویژگی های محصول را وارد کنید(حداقل یک فیلد باید پر باشد).";
    //     return false;

    // }

    // else if(product_img_main == ""){

    //     document.body.scrollTop = 0;
    //     document.documentElement.scrollTop = 0;
    //     error_field.style.display = "block";
    //     error_text.innerHTML = "لطفا تصویر اصلی محصول را بارگذاری نمایید."
    //     return false;

    // }

}