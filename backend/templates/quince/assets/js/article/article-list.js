$(document).ready(function () {

    $('#selectall').change(function () {

        if ($(this).prop('checked')) {

            $('.table_checkbox').prop('checked', true);

        } else {

            $('.table_checkbox').prop('checked', false);

        }

    });

    $('#selectall').trigger('change');

    $('.count_row_table_of_category').change(function () {

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
$('.remove_table_btn').on('click', function (e) {

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
$('.btn_delete_all_article').on('click', function (e) {

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
                        redirect(`${backend_url}article/api/delete-select-article/?${query}`);
                    }
                })
            }
        })
    }

})

// Change article status
$('.change_status_btn').on('click', function (e) {

    let article_id = $(e.currentTarget).attr('name');
    let article_status = $(e.currentTarget).attr('value');

    if(article_status == 'true'){

        article_status = 'غیر فعال';

    }
    else{

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
                    redirect(`${backend_url}article/api/change-status-article/?id=${article_id}`);
                }
            })
        }
    })
})

// Change article comments status
$('.change_comments_status_btn').on('click', function (e) {

    let article_id = $(e.currentTarget).attr('name');
    let article_status = $(e.currentTarget).attr('value');

    if(article_status == 'true'){

        article_status = 'غیر فعال';

    }
    else{

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
                    redirect(`${backend_url}article/api/change-comments-status-article/?id=${article_id}`);
                }
            })
        }
    })
})

// Edit article
$('.edit_btn').on('click', function (e) {

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

function redirect(url) {
    location.href = url
}

$('.btn_of_search').on('click', function (e) {

    let search_value = $('.category_search').val();
    if (search_value != "") {
        redirect(`${backend_url}article/search/${search_value}`);
    }

})

$('.remove_search_icon').on('click', function (e) {

    redirect(`${backend_url}article/list`);

})

