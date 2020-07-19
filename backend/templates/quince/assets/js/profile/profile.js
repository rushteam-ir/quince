
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
                    redirect(`${backend_url}profile/api/delete-avatar-profile`);
                }
            })
        }
    })
});

function redirect(url) {
    location.href = url
}

// upload custom

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

                let fieldHTML = '<div class="remove_parent"><img class="uploading_img_from_brows" src="' + e.target.result + '"> <div class="remove_img_icon remove"></div>  <button type="submit" class="btn add_img_icon"></button>  </div>';
                $(input).prev().append(fieldHTML);

            }

            reader.readAsDataURL(input.files[0]);
        }

    });

});

$(document).on('click', '.remove', function (e) {

    $(this).parents('.img-show').next().val('');
    $(this).parent('.remove_parent').remove();

});
