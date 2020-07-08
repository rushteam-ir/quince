$(document).ready(function () {

    $('#selectall').change(function () {

        if ($(this).prop('checked')) {

            $('.table_checkbox').prop('checked', true);

        } else {

            $('.table_checkbox').prop('checked', false);

        }

    });
});

// img modal

$('.QT_image img').click(function () {

    $('.image_modal_field').fadeIn();

});

$('.remove_modal').click(function () {

    $('.image_modal_field').fadeOut();

})