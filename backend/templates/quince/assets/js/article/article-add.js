function redirect(url) {
    location.href = url
}

// Get Sub Categories
$(document).ready(function () {

    $('.select-category').change(function () {

        $('.select-sub-category').find('option').remove()
        let parent_id = $(this).val();
        if (parent_id != "0") {
            let p = {
                "id": parent_id
            };
            $.get(`${backend_url}category/api/get-sub-category`, p, function (data) {

                $('#select-sub-category').find('option:gt(0)').remove();
                if (data.length == 0) {

                    let opt = '<option value="0">-----</option>';
                    $('.select-sub-category').append(opt);

                } else {

                    for (let i = 0; i < data.length; i++) {

                        let opt = '<option value="' + data[i]._id + '">' + data[i].title + '</option>';
                        $('.select-sub-category').append(opt);
                    }

                }

            })

        } else {

            let opt = '<option value="0">-----</option>';
            $('.select-sub-category').find('option:gt(0)').remove();
            $('.select-sub-category').append(opt);

        }
    })

});


// uploader custom

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

$('.show_img').click(function () {

    $('.img_upload_field').fadeToggle();

});