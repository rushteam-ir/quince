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

    } else if (discount_inp > 100) {

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

// pop over function

$(function () {
    $('[data-toggle="popover"]').popover()
})

// Uploaded file show
function readURL(input) {

    if (input.files && input.files[0]) {

        let reader = new FileReader();
        let wrapper = $('.product-img-main-show');
        let fieldHTML = '<div id="product-main-img-show"><img id="product-img-main" class="uploading_img_from_brows" src="#" alt=""><div class="remove_img_icon" onclick="removeImg()"></div></div>'

        reader.onload = function (e) {

            $(wrapper).append(fieldHTML);
            $('#product-img-main').attr('src', e.target.result);

        };

        reader.readAsDataURL(input.files[0]);

    }
}

function removeImg(){

    let this_id = document.getElementById('product-main-img-show');
    this_id.parentNode.removeChild(this_id);
    
}