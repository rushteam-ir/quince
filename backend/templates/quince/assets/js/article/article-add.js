(function () {

    $('.input-file-custom').each(function () {
        var $input = $(this),
            $label = $input.next('.js-labelFile'),
            labelVal = $label.html();
    });

})();

$(document).ready(function () {

    // show img when browse
    $(".input-file-custom").change(function () {

        let input = this;

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {

                let fieldHTML = '<div class="remove_parent"><img class="uploading_img_from_brows" src="' + e.target.result + '"> <div class="remove_img_icon remove"></div></div>';
                $(input).prev().append(fieldHTML);

            }

            reader.readAsDataURL(input.files[0]); // convert to base64 string
        }

    });

});

$(document).on('click', '.remove', function (e) {

    $(this).parents('.img-show').next().val('');
    $(this).parent('.remove_parent').remove();

});

$('.avatar_del').on('click', function (e) {

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
                    redirect(`${backend_url}profile/api/delete-avatar`);
                }
            })
        }
    })
});

function redirect(url) {
    location.href = url
}

// WYSIWYG Editor Options

new FroalaEditor('textarea', {

    imageUploadURL: `${backend_url}api/wysiwyg-image-uploader`,
    fileUploadURL: `${backend_url}api/wysiwyg-file-uploader`,
    videoUploadURL: `${backend_url}api/wysiwyg-video-uploader`,
    events : {
        'image.removed' : function ($img) {

            $.post(`${backend_url}api/wysiwyg-delete`,
                {
                    link_inp : $img.attr('src'),
                    type_inp : 'images'
                },
                function(data, status){});

        },

        'file.unlink' : function (file) {

            $.post(`${backend_url}api/wysiwyg-delete`,
                {
                    link_inp : file.getAttribute('href'),
                    type_inp : 'files'
                },
                function(data, status){});

        },

        'video.removed' : function ($video) {

            $.post(`${backend_url}api/wysiwyg-delete`,
                {
                    link_inp : $video.attr('src'),
                    type_inp : 'videos'
                },
                function(data, status){});

        }
    }

})

// Get Sub Categories
$(document).ready(function () {

    $('.select-category').change(function () {

        let parent_id = $(this).val();
        if(parent_id != ""){
            let p = {"id":parent_id};
            $.get(`${backend_url}category/api/get-sub-category`, p, function (data) {

                $('#select-sub-category').find('option:gt(0)').remove();
                for(let i = 0; i < data.length; i++){

                    let opt = '<option value="' + data[i]._id + '">' + data[i].title + '</option>';
                    $('.select-sub-category').append(opt);
                }

            })

        }
        else{

            $('.select-sub-category').find('option:gt(0)').remove();

        }
    })
});