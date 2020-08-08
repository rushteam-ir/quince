$('.second_edit_btn').click(function(){

    $('.second_modal_field').fadeIn();
    $('body').css('overflow','hidden');
    sessionStorage.modal = '2';

});

$('.close_second_modal').click(function(){

    $('.second_modal_field').fadeOut();
    $('body').css('overflow','auto');
    sessionStorage.modal = '0';

});