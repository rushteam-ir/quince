$('.edit_btn').click(function(){

    $('.modal_field').fadeIn();
    $('body').css('overflow','hidden');

});

$('.close_modal').click(function(){

    $('.modal_field').fadeOut();
    $('body').css('overflow','auto');

});