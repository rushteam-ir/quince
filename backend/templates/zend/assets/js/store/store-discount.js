$(document).on('change', '.end_class', function (e) {

    let index = parseInt($(this).attr('id')) + 1;
    $('.start_class_' + index.toString()).val($(this).val());
    $('.start_class_' + index.toString()).attr('value', $(this).val());

    if ($(this).val() != '') {

        $('.end_class_' + index.toString()).removeAttr('disabled', 'disabled');
        $('.discount_class_' + index.toString()).removeAttr('disabled', 'disabled').attr('placeholder', '0')

    } else {

        for (let i = index; i < 5; i++) {

            $('.end_class_' + i.toString()).attr('disabled', 'disabled');
            $('.discount_class_' + i.toString()).attr('disabled', 'disabled');
            $('.end_class_' + i.toString()).val('');
            $('.start_class_' + i.toString()).val('');
            $('.discount_class_' + i.toString()).val('');
            $('.discount_class_' + i.toString()).removeAttr('placeholder')

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

// errors

function discountError() {

    $('.alert_query').remove();

    let error_field = document.getElementById('error_field_warning_front');
    let error_text = document.getElementById('error_text');

    let package_name_inp = document.forms['discount_form']['package_name_inp'].value;
    let count_inp = document.forms['discount_form']['count_inp'].value;
    let day_inp = document.forms['discount_form']['day_inp'].value;
    let month_inp = document.forms['discount_form']['month_inp'].value;
    let year_inp = document.forms['discount_form']['year_inp'].value;

    if (package_name_inp == "") {

        scrollTop()
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا نام پکیج را وارد کنید.";
        return false;

    } else if (count_inp == "" || count_inp == 0) {

        scrollTop()
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا تعداد کد های تخفیف را وارد کنید.";
        return false;

    } else if (count_inp > 1000) {

        scrollTop()
        error_field.style.display = "block";
        error_text.innerHTML = "تعداد کد های وارد شده بیشتر از حد مجاز است."
        return false;

    } else if (day_inp == "" || month_inp == "" || year_inp == "") {

        scrollTop()
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا تاریخ انقضا را وارد کنید. ";
        return false;

    } else if (day_inp > 31 || day_inp < 1 || month_inp > 12 || month_inp < 1 || year_inp < 1399) {

        scrollTop()
        error_field.style.display = "block";
        error_text.innerHTML = "تاریخ وارد شده اشتباه می باشد.";
        return false;

    }

}