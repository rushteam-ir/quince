$('#sign_in').click(function () {
    $('#modal_of_sign_in').fadeIn();
    $('.close_icon').click(function () {
        $('#modal_of_sign_in').fadeOut();
    })
});

$('#sign_up').click(function () {
    $('#modal_of_sign_up').fadeIn();
    $('.close_icon').click(function () {
        $('#modal_of_sign_up').fadeOut();
    })
});

$('#search_icon').click(function () {
    $('#search_box').fadeIn();
    $('.close_icon').click(function () {
        $('#search_box').fadeOut();
    })
});

// comment modal

$('.reply_btn').click(function(){
    $('.modal_of_reply').fadeIn();
    $('.close_comment_modal').click(function(){
        $('.modal_of_reply').fadeOut(); 
    })
})