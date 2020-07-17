// check box


$('#selectall').change(function () {

    if ($(this).prop('checked')) {

        $('.table_checkbox').prop('checked', true);

    } else {

        $('.table_checkbox').prop('checked', false);

    }

});

// images modal

$('.QT_image img').click(function () {

    $('.image_modal_field').fadeIn();

});

$('.remove_modal').click(function () {

    $('.image_modal_field').fadeOut();

})

// upload custom

// (function () {

//     $('.input-file-custom').each(function () {
//         var $input = $(this),
//             $label = $input.next('.js-labelFile'),
//             labelVal = $label.html();
//     });

// })();

// $(document).ready(function () {

//     // show img when browse
//     $(".input-file-custom").change(function () {

//         let input = this;

//         if (input.files && input.files[0]) {
//             var reader = new FileReader();

//             reader.onload = function (e) {

//                 let fieldHTML = '<div class="remove_parent"><img class="uploading_img_from_brows" src="' + e.target.result + '"> <div class="remove_img_icon remove"></div></div>';
//                 $(input).prev().append(fieldHTML);

//             }

//             reader.readAsDataURL(input.files[0]);
//         }

//     });

// });

// $(document).on('click', '.remove', function (e) {

//     $(this).parents('.img-show').next().val('');
//     $(this).parent('.remove_parent').remove();

// });


// error js



function testf(){
    let test = $("input[name=test]").val();

    if( test.length < 20){

        $('.error_info').addClass('error_active');
        return false;

    }

}