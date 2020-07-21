$(document).ready(function () {

    $('#selectall').trigger('change');

    $('.limit_row').change(function () {

        let page_limit = $(this).val();
        $.post(`${backend_url}api/get-page-limit`, {
            limit: page_limit,
            url: `${backend_url}article/list`,
        }, function (data, status) {

            redirect(`${backend_url}article/list`);

        })

    })

});

// Delete article
$('.article_delete').on('click', function (e) {

    let article_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف مقاله',
        text: "آیا از حذف این مقاله مطمئن هستید ؟",
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
                text: 'مقاله مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}article/api/delete-article/?id=${article_id}`);
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
            title: 'حذف دسته',
            text: "آیا از حذف مقاله های انتخاب شده مطمئن هستید ؟",
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
                    text: 'مقاله های انتخاب شده با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                    icon: 'success',
                    confirmButtonText: 'تایید',
                }).then((result) => {
                    if (result.value) {
                        redirect(`${backend_url}article/api/delete-select/?${query}`);
                    }
                })
            }
        })
    }

})

// Change article status
$('.article_status').on('click', function (e) {

    let article_id = $(e.currentTarget).attr('name');
    let article_status = $(e.currentTarget).attr('value');

    if (article_status == 'true') {

        article_status = 'غیر فعال';

    } else {

        article_status = 'فعال';

    }

    Swal.fire({
        title: `${article_status} کردن مقاله`,
        text: `آیا از ${article_status} کردن این مقاله مطمئن هستید؟`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: `${article_status} شد`,
                text: `مقاله مور نظر با موفقیت ${article_status} شد برای تایید نهایی کلیک کنید`,
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}article/api/change-status/?id=${article_id}`);
                }
            })
        }
    })
})

// Change article comments status
$('.article_comments_status').on('click', function (e) {

    let article_id = $(e.currentTarget).attr('name');
    let article_status = $(e.currentTarget).attr('value');

    if (article_status == 'true') {

        article_status = 'غیر فعال';

    } else {

        article_status = 'فعال';

    }

    Swal.fire({
        title: `${article_status} کردن نظرات`,
        text: `آیا از ${article_status} کردن نظرات این مقاله مطمئن هستید؟`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
    }).then((result) => {
        if (result.value) {
            Swal.fire({
                title: `${article_status} شد`,
                text: `نظرات مقاله مور نظر با موفقیت ${article_status} شد برای تایید نهایی کلیک کنید`,
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}article/api/change-comments-status/?id=${article_id}`);
                }
            })
        }
    })
})

// Edit article
$('.article_edit').on('click', function (e) {

    let article_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'ویرایش مقاله',
        text: "آیا از ویرایش این مقاله مطمئن هستید ؟",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'بله',
        cancelButtonText: 'خیر',
    }).then((result) => {
        if (result.value) {
            redirect(`${backend_url}article/edit/${article_id}`);
        }
    })
})

$('.search_btn').on('click', function (e) {

    let search_value = $('.search_table').val();
    if (search_value != "") {
        redirect(`${backend_url}article/search/${search_value}`);
    }

})

$('.search_btn_cancel').on('click', function (e) {

    redirect(`${backend_url}article/list`);

})

function redirect(url) {
    location.href = url
}