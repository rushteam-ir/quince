let nav_modal_data =  $('.nav_modal_data')

for(let i = 0 ; i < nav_modal_data.length ; i++){

    nav_modal_data.eq(i).click(function(){

        $(this).next().fadeToggle(200);

    });

}

$('#comment_btn').click(function(){

    $('#article_comment').css('display' , 'block');
    $('#shop_comment').css('display' , 'none');
    $('#comment_btn').addClass('active_border');
    $('#shop_btn').removeClass('active_border');

});

$('#shop_btn').click(function(){

    $('#article_comment').css('display' , 'none');
    $('#shop_comment').css('display' , 'block');
    $('#shop_btn').addClass('active_border');
    $('#comment_btn').removeClass('active_border');
    $('#comment_btn').removeClass('comment_btn');

});