
function categoryError(){
    
    $('.alert_query').remove();
    
    var title_inp = document.forms['form_of_category']['title_inp'].value;
    var parent_inp = document.forms['form_of_category']['parent_inp'].value;

    var error_field = document.getElementById('error_field_warning_front');
    var error_text = document.getElementById('error_text');

    if(title_inp == ""){

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا عنوان دسته را وارد کنید.";
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