$('.keyword_btn').click(function () {

    let keys_inp = $('input[name=keys_inp]').val();

    if (keys_inp !== '') {

        let append_element = '<div class="key_word_box">';
        append_element += '<p>' + keys_inp + '</p>';
        append_element += '<button class="btn" type="button" onclick="keywordRemove(this)"><i class="fas fa-times test_remove"></i></button>';
        append_element += '</div>';

        $('.append_keyword').append(append_element);

        $('input[name=keys_inp]').val('');

    }

});

function keywordRemove(btn) {

    btn.parentNode.remove();
    
}