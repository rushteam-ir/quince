$('.QT_image img').click(function () {

    $('.image_modal_field').fadeIn();
    $('body').css('overflow','hidden');

});

$('.remove_modal').click(function () {

    $('.image_modal_field').fadeOut();
    $('body').css('overflow','auto');

})