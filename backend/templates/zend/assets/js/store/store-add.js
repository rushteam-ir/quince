// function storeAddError() {

//     let error_text = document.getElementById('store_add_error');
//     let title_inp = document.forms['store_add_form']['title_inp'].value;
//     let parent_inp = document.forms['store_add_form']['parent_inp'].value;
//     let child_inp = document.forms['store_add_form']['child_inp'].value;
//     let describe = document.forms['store_add_form']['describe'].value;
//     let price_inp = document.forms['store_add_form']['price_inp'].value;
//     let inventory_inp = document.forms['store_add_form']['inventory_inp'].value;
//     let discount_inp = document.forms['store_add_form']['discount_inp'].value;
//     let product_main_image = document.forms['store_add_form']['product_main_image'].value;


//     if (title_inp === "") {

//         error_text.style.display = "block";
//         document.body.scrollTop = 0;
//         document.documentElement.scrollTop = 0;
//         error_text.innerHTML = "لطفا عنوان محصول را انتخاب کنید";
//         return false;

//     } else if (parent_inp === "") {

//         error_text.style.display = "block";
//         error_text.innerHTML = "لطفا دسته را انتخاب کنید";
//         document.body.scrollTop = 0;
//         document.documentElement.scrollTop = 0;
//         return false;

//     } else if (child_inp === "0") {

//         error_text.style.display = "block";
//         error_text.innerHTML = "لطفا زیر دسته را انتخاب کنید";
//         document.body.scrollTop = 0;
//         document.documentElement.scrollTop = 0;
//         return false;

//     } else if (describe === "") {

//         error_text.style.display = "block";
//         error_text.innerHTML = "لطفا توضیحات محصول را بنویسید";
//         document.body.scrollTop = 0;
//         document.documentElement.scrollTop = 0;
//         return false;

//     } else if (price_inp === "") {

//         error_text.style.display = "block";
//         error_text.innerHTML = "لطفا قیمت محصول را وارد کنید";
//         document.body.scrollTop = 0;
//         document.documentElement.scrollTop = 0;
//         return false;

//     } else if (inventory_inp === "") {

//         error_text.style.display = "block";
//         error_text.innerHTML = "لطفا موجودی انبار را وارد کنید";
//         document.body.scrollTop = 0;
//         document.documentElement.scrollTop = 0;
//         return false;

//     } else if (discount_inp === "") {

//         error_text.style.display = "block";
//         error_text.innerHTML = "لطفا تخفیف را وارد کنید";
//         document.body.scrollTop = 0;
//         document.documentElement.scrollTop = 0;
//         return false;

//     } else if (discount_inp > 100) {

//         error_text.style.display = "block";
//         error_text.innerHTML = "تخفیف بیشتر از 100 درصد مجاز نمی باشد";
//         document.body.scrollTop = 0;
//         document.documentElement.scrollTop = 0;
//         return false;

//     } else if (product_main_image === "") {

//         error_text.style.display = "block";
//         error_text.innerHTML = "لطفا عکس اصلی را آپلود کنید";
//         document.body.scrollTop = 0;
//         document.documentElement.scrollTop = 0;
//         return false;

//     } else if (product_main_image === "") {

//         error_text.style.display = "block";
//         error_text.innerHTML = "لطفا عکس اصلی را آپلود کنید";
//         document.body.scrollTop = 0;
//         document.documentElement.scrollTop = 0;
//         return false;

//     }

// }

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
})


$(document).ready(function () {

    if (window.File && window.FileList && window.FileReader) {

        $("#files").on("change", function (e) {

            var files = e.target.files,
                filesLength = files.length;
            for (var i = 0; i < filesLength; i++) {

                var f = files[i]
                var fileReader = new FileReader();
                fileReader.onload = (function (e) {

                    var file = e.target;
                    $("<div class=\"col-4 pr-0 mt-3\">"+
                        
                        "<span class=\"pip\">" +

                        "<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + file.name + "\"/>" +

                        "<br/><span class=\"remove\"></span>" +

                        "</span>"+
                        
                        "</div>").insertAfter("#files");

                    $(".remove").click(function () {
                        $(this).parents(".col-4").remove();
                    });

                });

                fileReader.readAsDataURL(f);
            }
        });



    } else {

        alert("Your browser doesn't support to File API")
    }
});

$(document).ready(function () {
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            let wrapper = $('.main-row');
            let fieldHTML = '<div class="col-4 pr-0 mt-3 main-image-show"><span class="pip"><img id="main-image-show" class="imageThumb" src="#"><br><span class="remove"><span><span></div>'
            reader.onload = function (e) {
                if (!$(".main-image-show")[0]){
                    $(wrapper).append(fieldHTML);
                }
                $('#main-image-show').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#main_pic_files").change(function () {
        readURL(this);
    });

    $(".remove").click(function () {
        $(this).parents(".col-4").remove();
    });

})