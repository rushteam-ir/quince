// function discountError(){

//     $('.alert_query').remove();

// }


// input add & remove
$(document).ready(function () {

    let maxField = 5;
    let addButton = $('.add_button');
    let wrapper = $('.field_wrapper');
    let fieldHTML = '<div class="my-5">    <div class="d-inline-block">    <label class="d-inline-block" for="">از</label>    <input type="text" class="form-control d-inline-block discount_inp_custom mx-2"></div><div class="d-inline-block">    <label class="d-inline-block mr-1" for="">تا</label>    <input type="text" class="form-control d-inline-block discount_inp_custom mx-2"></div><div class="d-inline-block">    <label class="d-inline-block mr-1" for="">، میزان تخفیف :</label>    <input type="text" class="form-control d-inline-block last_discount_inp_custom mx-2"></div>    </div>';
    let x = 1;

    $(addButton).click(function () {

        if (x < maxField) {

            x++;
            $(wrapper).append(fieldHTML);

        }

    });

    $(wrapper).on('click', '.remove_button', function (e) {

        e.preventDefault();
        $(this).parent('div').remove();
        x--;

    });

});
















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

