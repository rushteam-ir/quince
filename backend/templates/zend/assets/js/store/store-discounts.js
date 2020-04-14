$(document).ready(function () {

    let maxField = 10;
    let addButton = $('.add_button');
    let wrapper = $('.field_wrapper');
    let x = 1;
    var i;

    $(addButton).click(function () {

        if (x < maxField) {

            x++;
            let fieldHTML = '<div class="my-5">    <div class="d-inline-block">    <label class="d-inline-block" for="">شروع تخفیف از قیمت :</label>    <input type="text"  name="start_inp[]" class="form-control d-inline-block discount_inp_custom mx-2 start_class_value start_class_'+ x.toString() +'"  disabled></div><div class="d-inline-block">    <label class="d-inline-block mr-1" for="">تا</label>    <input type="text" placeholder="&#8734" id="'+ x.toString() + '" class="form-control d-inline-block discount_inp_custom mx-2 end_class"></div><div class="d-inline-block">    <label class="d-inline-block mr-1" for="">، میزان تخفیف :</label>    <input type="text" class="form-control d-inline-block last_discount_inp_custom mx-2"></div> <a href="javascript:void(0);" class="remove_button"><i class="fas fa-minus mt-2"></i></a>   </div>';
            $(wrapper).append(fieldHTML);

            var start = document.getElementsByClassName('start_class_value');
            var end = document.getElementsByClassName('end_class');


            for (i = 0; i <= start.length; i++) {

                var end_val = end[i].value
                start[i].setAttribute('value', end_val);

            }

        }

    });

    $(wrapper).on('click', '.remove_button', function (e) {

        e.preventDefault();
        $(this).parent('div').remove();
        x--;

    });

    $('.end_class').change(function() {
        $('.start_class_2').val($(this).val());
    });

});

$(document).on('change', '.end_class', function(e) {

    let index = parseInt($(this).attr('id')) + 1;
    $('.start_class_' + index.toString()).val($(this).val());

});


// input add & remove







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
                title: 'حذف شد',
                text: 'کد تخفیف مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
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