
$('.keyword_btn').click(function(){

    let keys_inp = $('input[name=keys_inp]').val();

    let append_element = '<div class="key_word_box"><p>' + keys_inp + '</p><i class="fas fa-times"></i></div>';

    $('.append_keyword').append(append_element);

});