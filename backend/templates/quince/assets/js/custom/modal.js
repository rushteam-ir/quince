$('.edit_btn').click(function(){

    $('.modal_field').fadeIn();
    $('body').css('overflow','hidden');
    sessionStorage.modal = '1';

});

$('.close_modal').click(function(){

    $('.modal_field').fadeOut();
    $('body').css('overflow','auto');
    sessionStorage.modal = '0';

});