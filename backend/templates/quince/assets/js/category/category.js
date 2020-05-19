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
            limit : page_limit,
            url : `${backend_url}category`,
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

$('.remove_category_table').on('click', function (e) {



})

function redirect(url) {
    location.href = url
}