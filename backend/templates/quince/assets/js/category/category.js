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
            url: `${backend_url}category`,
        }, function (data, status) {

            redirect(`${backend_url}category`);

        })

    })

});

$('.remove_table_btn').on('click', function (e) {

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
                title: 'حذف شد',
                text: 'دسته مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}category/api/delete-category/?id=${cat_id}`);
                }
            })
        }
    })
})

$('.btn_delete_all_category').on('click', function (e) {

    let query = ''

    $(':checkbox:checked').each(function (i) {
        if ($(this).attr('name') != 'select_all') {
            query += '&id[]=' + $(this).val();
        }
    });

    if (query != '') {
        Swal.fire({
            title: 'حذف دسته',
            text: "آیا از حذف دسته های انتخاب شده مطمئن هستید ؟",
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
                    text: 'دسته های انتخاب شده با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                    icon: 'success',
                    confirmButtonText: 'تایید',
                }).then((result) => {
                    if (result.value) {
                        redirect(`${backend_url}category/api/delete-select-category/?${query}`);
                    }
                })
            }
        })
    }


})

$('.btn_of_search').on('click', function (e) {

    let search_value = $('.category_search').val();
    if (search_value != "") {
        redirect(`${backend_url}category/search/${search_value}`);
    }

})

$('.remove_search_icon').on('click', function (e) {

    redirect(`${backend_url}category`);

})

function redirect(url) {
    location.href = url
}

// modal

$(document).ready(function () {

    $('.edit_table_btn').click(function () {

        let category_title = $('.category_table_customize').eq(2).text();
        $('.category_edit_title').val(category_title)

        $('.modal_of_category').fadeIn();

    });

    $('.btn_of_cancel_changes').click(function () {

        $('.modal_of_category').fadeOut();

    });

});