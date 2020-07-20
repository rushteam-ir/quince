
$('.keyword_btn').click(function(){

    let keys_inp = $('input[name=keys_inp]').val();

    if(keys_inp !== ''){

        let append_element = '<div class="key_word_box"><p>' + keys_inp + '</p><i class="fas fa-times"></i></div>';

        $('.append_keyword').append(append_element);

        $('input[name=keys_inp]').val('');

    }

});