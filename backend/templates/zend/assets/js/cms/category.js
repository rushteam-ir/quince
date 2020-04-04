function categoryError() {

    var category_modal_error_field = document.getElementById('category_modal_error_field');

    var edit_title_inp = document.forms['category_modal_form']['edit_title_inp'].value;
    var parent_inp = document.forms['category_modal_form']['parent_inp'].value;

    if (edit_title_inp == "" || parent_inp == "0")

    {

        category_modal_error_field.style.display = "block";
        category_modal_error_field.innerHTML = "لطفا ورودی ها را پر کنید";
        return false;

    }
}

// sweet alert

$('.cat_del').on('click', function (e) {

    let cat_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف دسته',
        text: "آیا از حذف این دسته مطمئن هستید ؟",
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
                text : 'دسته مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon : 'success',
                confirmButtonText: 'تایید',
            }).then((result)=>{
                if (result.value) {
                    redirect(`${backend_url}category/api/delete-category/?id=${cat_id}`);
                }
            })
        }
    })
})




function redirect(url) {
    location.href = url
}