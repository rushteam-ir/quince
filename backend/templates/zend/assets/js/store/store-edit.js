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
                title : 'حذف شد',
                text : 'تصویر مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon : 'success',
                confirmButtonText: 'تایید',
            }).then((result)=>{
                if (result.value) {
                    redirect(`${backend_url}store/api/delete-image/?id=${image_id}`);
                }
            })
        }
    })
});

// input add & remove
$(document).ready(function () {

    let maxField = 10;
    let addButton = $('.add_button');
    let wrapper = $('.field_wrapper');
    let fieldHTML = '<div class="col-6 p-0"><input class="form-control width_inp_customize" name="product_features_inp[]" type="text" value=""><a href="javascript:void(0);" class="remove_button"><i class="fas fa-minus mt-2"></i></a></div>';
    let x = 1;

    let d = {"id": $('#product-id').attr('value') };
        $.get(`${backend_url}store/api/get-features`, d, function (data) {

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

function redirect(url) {
    location.href = url
}