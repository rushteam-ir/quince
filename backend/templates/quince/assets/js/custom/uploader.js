$(".chose_file_inp").change(function(){

    readURL(this);

    $('.show_img').css('display' , 'inline-block');
    
});

function readURL(input) {

    if (input.files && input.files[0]) {

        var reader = new FileReader();
        
        reader.onload = function (e) {

            $(input).next().children().attr('src', e.target.result);

        }

        reader.readAsDataURL(input.files[0]);
        
    }

};

$('.show_img').click(function(){

    $('.img_upload_field').fadeToggle();

});

