$('.product_del').on('click', function (e) {

    let product_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف محصول',
        text: "آیا از حذف این محصول مطمئن هستید ؟",
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
                text : 'محصول مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon : 'success',
                confirmButtonText: 'تایید',
            }).then((result)=>{
                if (result.value) {
                    redirect(`${backend_url}store/?del=${product_id}`);
                }
            })
        }
    })
})

function redirect(url) {
    location.href = url
}