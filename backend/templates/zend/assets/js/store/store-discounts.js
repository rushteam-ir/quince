function discountError(){

    $('.alert_query').remove();

    var value_inp = document.forms['discount_form']['value_inp'].value;
    var error_field = document.getElementById('error_field_warning_front');
    var error_text = document.getElementById('error_text')

    if(value_inp == ""){

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا میزان تخفیف را وارد کنید .";
        return false;

    }

    else if(value_inp >100){

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا عدد تخفیف را وارد کنید.";
        return false;

    }

}

// Delete discount code
$('.remove_discount').on('click', function (e) {

    let discount_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف کد تخفیف',
        text: "آیا از حذف این کد تخفیف مطمئن هستید ؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title : 'حذف شد',
                text : 'کد تخفیف مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon : 'success',
                confirmButtonText: 'تایید',
            }).then((result)=>{
                if (result.value) {
                    redirect(`${backend_url}store/api/delete-discount-code/?id=${discount_id}`);
                }
            })
        }
    })
});