// errors


function storeAddError() {

    $('.alert_query').remove();

    var error_field = document.getElementById('error_field_warning_front');
    var error_text = document.getElementById('error_text');

    var title_inp = document.forms['store_edit_form']['title_inp'].value;
    var parent_inp = document.forms['store_edit_form']['parent_inp'].value;
    var child_inp = document.forms['store_edit_form']['child_inp'].value;
    var describe_inp = document.forms['store_edit_form']['describe_inp'].value;
    var price_inp = document.forms['store_edit_form']['price_inp'].value;
    var stock_inp = document.forms['store_edit_form']['stock_inp'].value;
    var discount_inp = document.forms['store_edit_form']['discount_inp'].value;

    if (title_inp == "" || parent_inp == "" || child_inp == "" || describe_inp == "" || price_inp == "" || stock_inp == "" || discount_inp == "") {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا تمام فیلد ها را پر کنید.";
        return false;

    } else if (product_features_inp == "") {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا ویژگی های محصول را وارد کنید(حداقل یک فیلد باید پر باشد).";
        return false;

    } else if (product_img_main == "") {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا تصویر اصلی محصول را بارگذاری نمایید."
        return false;

    } else if (isNaN(price_inp)) {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا قیمت کالا را درست وارد کنید."
        return false;

    } else if (isNaN(stock_inp)) {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا موجودی انبار را درست وارد کنید."
        return false;

    } else if (isNaN(discount_inp)) {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا تخفیف را درست وارد کنید."
        return false;

    }

    else if(discount_inp > 100){

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا مقدار تخفیف را درست وارد کنید."
        return false;

    }

}


// delete image sweet alert
$('.product_del').on('click', function (e) {

    let image_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف تصویر',
        text: "آیا از حذف این تصویر مطمئن هستید ؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'حذف شد',
                text: 'تصویر مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}store/api/delete-image/?id=${image_id}`);
                }
            })
        }
    })
});

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

$(document).on('change', '.width_inp_customize', function (e) {

    let index = parseInt($(this).attr('id')) + 1;

    if ($(this).val() != '') {

        $('.features_class_' + index.toString()).removeAttr('disabled', 'disabled');

    } else {

        for (let i = index; i < 4; i++) {

            $('.features_class_' + i.toString()).attr('disabled', 'disabled');
            $('.features_class_' + i.toString()).val('');

        }

    }

});

function redirect(url) {
    location.href = url
}