$(document).ready(function () {

    $('#selectall').trigger('change');

    $('.limit_row').change(function () {

        let page_limit = $(this).val();
        $.post(`${backend_url}api/get-page-limit`, {
            limit: page_limit,
            url: `${backend_url}category`,
        }, function (data, status) {

            redirect(`${backend_url}category`);

        });

    });

    $('.delete_category').on('click', function (e) {

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

    $('.table_delete_btn').on('click', function (e) {

        let query = '';

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

    $('.search_btn').on('click', function (e) {

        let search_value = $('.search_table').val();
        if (search_value != "") {
            redirect(`${backend_url}category/search/${search_value}`);
        }

    })

    $('.search_btn_cancel').on('click', function (e) {

        redirect(`${backend_url}category`);

    })

    // modal

    $('.edit_category').click(function () {

        $('.category_modal').fadeIn();
        $('body').css('overflow','hidden');

        $.post(`${backend_url}category/api/get-category`, {
            id: $(this).attr('name'),
        }, function (data, status) {

            let title = data[0].title;
            let parent_id = '';
            let category_id = data[0]._id;

            if (data[0].parent == null) {

                parent_id = '0';

            } else {

                parent_id = data[0].parent._id;

            }

            $('.edit_category_title').val(title);
            $('.edit_category_id').val(category_id);
            $(`.edit_category_parent option`).removeAttr('selected');
            $(`.edit_category_parent option[value="${parent_id}"]`).attr('selected', 'selected');

        });

    });

    $('.red_btn').click(function () {

        $('.category_modal').fadeOut();
        $('body').css('overflow','auto');

    });

});

function redirect(url) {
    location.href = url
}