$(document).ready(function () {

    $('#selectall').trigger('change');
    sessionStorage.modal = '0';

    $('.limit_row').change(function () {

        let page_limit = $(this).val();
        $.post(`${backend_url}api/get-page-limit`, {
            limit: page_limit,
            url: `${backend_url}files`,
        }, function (data, status) {

            redirect(`${backend_url}files`);

        })

    })

});

$('.download_btn').click(function (){

    let path = $(this).attr('name');

    redirect(`${backend_url}api/file-manager/download/?path=${path}`)

});

$('.table_home_btn').click(function (){

    redirect(`${backend_url}files`)

});

$('.table_backward_btn').click(function (){

    let path = $(this).attr('name');

    redirect(`${backend_url}files/?path=${path}`)

});

$('.file_delete').on('click', function (e) {

    let path = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف فایل',
        text: "آیا از حذف این فایل مطمئن هستید ؟",
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
                text: 'فایل مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}api/file-manager/delete/?path=${path}`);
                }
            })
        }
    })
})

function redirect(url) {
    location.href = url
};