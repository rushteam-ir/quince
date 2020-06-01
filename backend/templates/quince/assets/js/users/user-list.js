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


$(document).ready(function () {

    $('.img_of_user').click(function () {

        $('.img_modal_field').fadeIn();

    })

    $('.img_modal_field').click(function () {

        $('.img_modal_field').fadeOut();

    })

    $('.remove_img_modal').click(function () {

        $('.img_modal_field').fadeOut();

    })

});