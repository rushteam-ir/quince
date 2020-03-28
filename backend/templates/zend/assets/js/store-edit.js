function storeAddError() {

    let error_text = document.getElementById('store_add_error');
    let title_inp = document.forms['store_add_form']['title_inp'].value;
    let parent_inp = document.forms['store_add_form']['parent_inp'].value;
    let child_inp = document.forms['store_add_form']['child_inp'].value;
    let describe = document.forms['store_add_form']['describe'].value;
    let price_inp = document.forms['store_add_form']['price_inp'].value;
    let inventory_inp = document.forms['store_add_form']['inventory_inp'].value;
    let discount_inp = document.forms['store_add_form']['discount_inp'].value;
    let product_main_image = document.forms['store_add_form']['product_main_image'].value;

    if (title_inp === "") {

        error_text.style.display = "block";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_text.innerHTML = "لطفا عنوان محصول را انتخاب کنید";
        return false;

    } else if (parent_inp === "") {

        error_text.style.display = "block";
        error_text.innerHTML = "لطفا دسته را انتخاب کنید";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;

    } else if (child_inp === "0") {

        error_text.style.display = "block";
        error_text.innerHTML = "لطفا زیر دسته را انتخاب کنید";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;

    } else if (describe === "") {

        error_text.style.display = "block";
        error_text.innerHTML = "لطفا توضیحات محصول را بنویسید";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;

    } else if (price_inp === "") {

        error_text.style.display = "block";
        error_text.innerHTML = "لطفا قیمت محصول را وارد کنید";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;

    } else if (inventory_inp === "") {

        error_text.style.display = "block";
        error_text.innerHTML = "لطفا موجودی انبار را وارد کنید";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;

    } else if (discount_inp === "") {

        error_text.style.display = "block";
        error_text.innerHTML = "لطفا تخفیف را وارد کنید";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;

    } else if (discount_inp.length > 3) {

        error_text.style.display = "block";
        error_text.innerHTML = "تخفیف بیشتر از 100 درصد مجاز نمی باشد";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;

    } else if (product_main_image === "") {

        error_text.style.display = "block";
        error_text.innerHTML = "لطفا عکس اصلی را آپلود کنید";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;

    } else if (product_main_image === "") {

        error_text.style.display = "block";
        error_text.innerHTML = "لطفا عکس اصلی را آپلود کنید";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;

    }

}
// input add & remove
$(document).ready(function () {

    let maxField = 10;
    let addButton = $('.add_button');
    let wrapper = $('.field_wrapper');
    let fieldHTML = '<div class="col-6 p-0"><input class="form-control width_inp_customize" name="product_features_inp[]" type="text" value=""><a href="javascript:void(0);" class="remove_button"><i class="fas fa-minus mt-2"></i></a></div>';
    let x = 1;

    let d = {"id": $('#product-id').attr('value') };
        $.get(`${backend_url}store/features`, d, function (data) {

        for(let i = 1; i < data.length; i++){

            let fieldHTML2 = '<div class="col-6 p-0"><input class="form-control width_inp_customize" name="product_features_inp[]" type="text" value='+data[i]+'><a href="javascript:void(0);" class="remove_button"><i class="fas fa-minus mt-2"></i></a></div>';

            if (x < maxField) {

                x++;
                $(wrapper).append(fieldHTML2);

            }

        }

    });

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




// file add & remove

$(document).ready(function () {

    let maxField = 6;
    let addButton = $('.file_add_button');
    let wrapper = $('.field_wrapper_file');

    let x = 1;

    $(addButton).click(function () {

        if (x < maxField) {

            x++;
            let fieldHTML = '<div class="col-6 p-0 mb-3"><input type="file" name="product_images[]" id="product_img_main_' + x.toString() + '" class="input-file-custom"><label for="product_img_main_' + x.toString() + '" class="btn btn-tertiary js-labelFile">  <i class="icon fa fa-check"></i><span class="js-fileName mr-2">انتخاب عکس</span></label><a href="javascript:void(0);" class="remove_button_file"><i class="fas fa-minus mt-2"></i></a></div>';
            $(wrapper).append(fieldHTML);
            // chose file customize
            $('.input-file-custom').each(function () {
                var $input = $(this),
                    $label = $input.next('.js-labelFile'),
                    labelVal = $label.html();

                $input.on('change', function (element) {
                    var fileName = '';
                    if (element.target.value) fileName = element.target.value.split('\\').pop();
                    fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass(
                        'has-file').html(labelVal);
                });
            });
            // end chose file custome
        }

    });

    $(wrapper).on('click', '.remove_button_file', function (e) {

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

        $input.on('change', function (element) {
            var fileName = '';
            if (element.target.value) fileName = element.target.value.split('\\').pop();
            fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass(
                'has-file').html(labelVal);
        });
    });

})();

// pop over function

$(function () {
    $('[data-toggle="popover"]').popover()
});

function deleteCall() {

    let image_name = $('#main-image').attr('name').replace('.png', '');
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
                text: 'تصویر پروفایل شما با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}store/delete/?id=${image_name}`);
                }
            })
        }
    })
    return false
}

function redirect(url) {
    location.href = url
}