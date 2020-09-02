$(".chose_file_inp").change(function () {

    readURL(this);

    let img_name = ''

    if(this.files && this.files.length){

        img_name = this.files[0].name;

        $('.show_img').css('display', 'inline-block');

    }
    else{

        img_name = '';

        $('.show_img').css('display', 'none');

        $('.img_upload_field').css('display' , 'none');

    }

    $('.chose_file_inp').attr('data-value', img_name);

});


function readURL(input) {

    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function (e) {

            $(input).next().children('img').attr('src', e.target.result);

        }

        reader.readAsDataURL(input.files[0]);

    }

};

// show image when press (image show btn)
$('.show_img').click(function () {

    $('.img_upload_field').fadeToggle();

});