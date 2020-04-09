$('.user_status').on('click', function (e) {

    let user_id = $(e.currentTarget).attr('name');
    let sweet_alert_status = $(e.currentTarget).attr('value');

    Swal.fire({
        title: sweet_alert_status + " کاربر",
        text: "آیا از " + sweet_alert_status + " حساب این کاربر مطمئن هستید ؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title : 'انجام شد',
                text : 'برای تایید نهایی کلیک کنید',
                icon : 'success',
                confirmButtonText: 'تایید',
            }).then((result)=>{
                if (result.value) {
                    redirect(`${backend_url}users/api/change-status/?id=${user_id}`);
                }
            })
        }
    })
});

$('.user_del').on('click', function (e) {

    let user_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف کاربر',
        text: "آیا از حذف این کاربر مطمئن هستید ؟",
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
                text : 'کاربر مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon : 'success',
                confirmButtonText: 'تایید',
            }).then((result)=>{
                if (result.value) {
                    redirect(`${backend_url}users/api/delete-user/?id=${user_id}`);
                }
            })
        }
    })
});

function redirect(url) {
    location.href = url
}
