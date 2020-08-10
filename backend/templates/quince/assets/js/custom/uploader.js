$(".chose_file_inp").change(function(){

    readURL(this);

    $('.show_img').css('display' , 'inline-block');

    let img_name = this.files && this.files.length ? this.files[0].name.split('*')[0] : '';

    $('.chose_file_inp').attr('data-value',img_name);

    if(img_name == ''){

        $('.img_upload_field').css('display' , 'none');
        $('.show_img').css('display' , 'none');

    }
    
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
