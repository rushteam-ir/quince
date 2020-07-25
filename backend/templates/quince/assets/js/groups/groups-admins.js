$(document).ready(function () {

    $('#selectall').trigger('change');

    $('.limit_row').change(function () {

        let page_limit = $(this).val();
        $.post(`${backend_url}api/get-page-limit`, {
            limit: page_limit,
            url: `${backend_url}groups/admins`,
        }, function (data, status) {

            redirect(`${backend_url}groups/admins`);

        })

    })

});

$('.search_btn').on('click', function (e) {

    let search_value = $('.search_table').val();
    if (search_value != "") {
        redirect(`${backend_url}groups/admins/search/${search_value}`);
    }

})

$('.search_btn_cancel').on('click', function (e) {

    redirect(`${backend_url}groups/admins`);

})

// Delete admin
$('.user_delete').on('click', function (e) {

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
                title: 'حذف شد',
                text: 'کاربر مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}groups/admins/api/delete-admins/?id=${user_id}`);
                }
            })
        }
    })
})

// Delete Selected article
$('.table_delete_btn').on('click', function (e) {

    let query = ''

    $(':checkbox:checked').each(function (i) {
        if ($(this).attr('name') != 'select_all') {
            query += '&id[]=' + $(this).val();
        }
    });

    if (query != '') {
        Swal.fire({
            title: 'حذف کاربر',
            text: "آیا از حذف کاربر های انتخاب شده مطمئن هستید ؟",
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
                    text: 'کاربر های انتخاب شده با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                    icon: 'success',
                    confirmButtonText: 'تایید',
                }).then((result) => {
                    if (result.value) {
                        redirect(`${backend_url}groups/admins/api/delete-select/?${query}`);
                    }
                })
            }
        })
    }

})

// Change admin status
$('.admin_status').on('click', function (e) {

    let admin_id = $(e.currentTarget).attr('name');
    let admin_status = $(e.currentTarget).attr('value');

    if (admin_status == 'true') {

        admin_status = 'مسدود';

    } else {

        admin_status = 'فعال';

    }

    Swal.fire({
        title: `${admin_status} کردن کاربر`,
        text: `آیا از ${admin_status} کردن این کاربر مطمئن هستید؟`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: `${admin_status} شد`,
                text: `کاربر مور نظر با موفقیت ${admin_status} شد برای تایید نهایی کلیک کنید`,
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}groups/admins/api/change-status/?id=${admin_id}`);
                }
            })
        }
    })
})

// Change Access
$('.edit_btn').click(function () {

    $.post(`${backend_url}groups/access/api/get-access`, {
        id: $(this).attr('name'),
    }, function (data, status) {


        $(`.edit_access option`).removeAttr('selected');
        $(`.edit_access option[value="${data._id}"]`).attr('selected', 'selected');

    });

});

function redirect(url) {
    location.href = url
}