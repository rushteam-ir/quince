$(document).ready(function () {

    $('#selectall').change(function () {

        if ($(this).prop('checked')) {

            $('.table_checkbox').prop('checked', true);

        } else {

            $('.table_checkbox').prop('checked', false);

        }

    });

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

$('.remove_search_icon').on('click', function (e) {

    redirect(`${backend_url}category`);

})

// modal

    // let category_row = $('.category_row');


    // for (let i = 0; i < category_row.length; i++) {

    //     $('.edit_table_btn').eq(i).click(function () {

    //         let parent_category = $(this).parent().parent().children().eq(3).text();
    //         let category_name = $(this).parent().parent().children().eq(2).text();

    //         $('.category_edit_title').val(category_name);

    //         $(".category_edit_parent").children().eq(0).text(parent_category);


    //         $('.category_edit_id').val(

    //             $(this).parent().parent().children().eq(0).children().children().val()

    //         );

    //         $('.modal_of_category').fadeIn();

    //     });

    // }

    $('.edit_category').click(function(){

        $('.category_modal').fadeIn();
    
    });

    $('.red_btn').click(function () {

        $('.category_modal').fadeOut();

    });

});

function redirect(url) {
    location.href = url
}