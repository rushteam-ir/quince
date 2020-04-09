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
            fileName ? $label.addClass('has-file').find('.js-fileName').html(fileName) : $label.removeClass('has-file').html(labelVal);

        });
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
                $('.img-box').append(fieldHTML);

            }

            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }

    });

    // remove img of browse
    // $("#salam"). click(function () {
    //     alert('hi')
    // });

});

// pop over function

$(function () {
    $('[data-toggle="popover"]').popover()
})