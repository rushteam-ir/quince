$(document).on('change', '.end_class', function(e) {

    let index = parseInt($(this).attr('id')) + 1;
    $('.start_class_' + index.toString()).val($(this).val());
    $('.start_class_' + index.toString()).attr('value', $(this).val());

    if($(this).val() != ''){

        $('.end_class_' + index.toString()).removeAttr('disabled', 'disabled');
        $('.discount_class_' + index.toString()).removeAttr('disabled', 'disabled').val('0');

    }
    else{

        for(let i = index; i <= 5; i++){

            $('.end_class_' + i.toString()).attr('disabled', 'disabled');
            $('.discount_class_' + i.toString()).attr('disabled', 'disabled');
            $('.end_class_' + i.toString()).val('');
            $('.start_class_' + i.toString()).val('');
            $('.discount_class_' + i.toString()).val('');

        }

    }

});


/*

               < 0
                //>   Polybius
                \\

 */


//Delete discount code
$('.remove_discount').on('click', function (e) {

    let discount_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف کل پکیج تخفیف',
        text: "آیا از حذف این پکیج تخفیف مطمئن هستید ؟ توجه فرمایید که ممکن هست هنوز کد های فعالی داخل پکیج وجود داشته باشند",
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
                text: 'پکیج تخفیف مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}store/api/delete-discount-code/?id=${discount_id}`);
                }
            })
        }
    })
});