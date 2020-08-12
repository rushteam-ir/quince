// Delete main image
$('.image_del').on('click', function (e) {

    let image_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف تصویر',
        text: "آیا از حذف این تصویر مطمئن هستید ؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: 'حذف شد',
                text: 'تصویر مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}article/api/delete-main-image/?id=${image_id}`);
                }
            })
        }
    })
});

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

$('.show_img').css('display', 'inline-block');
$('.img_upload_field').css('display' , 'block');

$(".chose_file_inp").change(function () {

    readURL(this);

    $('.show_img').css('display', 'inline-block');

    let img_name = this.files[0].name;

    $('.chose_file_inp').attr('data-value', img_name);

});

$('.remove_main_img').click(function () {

    $('.img_upload_field , .show_img').css('display', 'none');

    $(".chose_file_inp").val('');

    $('.chose_file_inp').attr('data-value', '');

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