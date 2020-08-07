$(document).ready(function () {

    $('#selectall').trigger('change');
    sessionStorage.modal = '0';

    $('.limit_row').change(function () {

        let page_limit = $(this).val();
        $.post(`${backend_url}api/get-page-limit`, {
            limit: page_limit,
            url: `${backend_url}groups/access`,
        }, function (data, status) {

            redirect(`${backend_url}groups/access`);

        })

    })

});

// Delete Access
$('.access_delete').on('click', function (e) {

    let access_id = $(e.currentTarget).attr('name');

    Swal.fire({
        title: 'حذف دسترسی',
        text: "آیا از حذف این دسترسی مطمئن هستید ؟",
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
                text: 'دسترسی مور نظر با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                icon: 'success',
                confirmButtonText: 'تایید',
            }).then((result) => {
                if (result.value) {
                    redirect(`${backend_url}groups/access/api/delete-access/?id=${access_id}`);
                }
            })
        }
    })
})

// Delete Selected access
$('.table_delete_btn').on('click', function (e) {

    let query = ''

    $(':checkbox:checked').each(function (i) {
        if ($(this).attr('name') != 'select_all' && $(this).attr('name') != 'access_select') {
            query += '&id[]=' + $(this).val();
        }
    });

    if (query != '') {
        Swal.fire({
            title: 'حذف دسترسی',
            text: "آیا از حذف دسترسی های انتخاب شده مطمئن هستید ؟",
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
                    text: 'دسترسی های انتخاب شده با موفقیت حذف شد برای تایید نهایی کلیک کنید',
                    icon: 'success',
                    confirmButtonText: 'تایید',
                }).then((result) => {
                    if (result.value) {
                        redirect(`${backend_url}groups/access/api/delete-select/?${query}`);
                    }
                })
            }
        })
    }

})

$('.search_btn').on('click', function (e) {

    let search_value = $('.search_table').val();
    if (search_value != "") {
        redirect(`${backend_url}groups/access/search/${search_value}`);
    }

})

$('.search_btn_cancel').on('click', function (e) {

    redirect(`${backend_url}groups/access`);

})

$('.edit_btn').click(function () {

    $.post(`${backend_url}groups/access/api/get-access`, {
        id: $(this).attr('name'),
    }, function (data, status) {

        let title = data.title;
        let access_id = data._id;
        let access_list = data.values;

        $('.edit_access_title').val(title);
        $('.edit_access_id').val(access_id);

        $("input[name='edit_access_select_inp[]']:checkbox").prop('checked',false);
        $.each(access_list, function(i, val){

            $("input[name='edit_access_select_inp[]'][value='" + val + "']").prop('checked', true);

        });

    });

});

function redirect(url) {
    location.href = url
}

// lable collapse

var lable_collaps = document.getElementsByClassName('lable_collaps');

for (let i = 0; i < lable_collaps.length; i++) {

    lable_collaps[i].addEventListener('click', function () {

        let panel = this.nextElementSibling;

            if (panel.style.maxHeight) {

                panel.style.maxHeight = null;

            } else {

                panel.style.maxHeight = panel.scrollHeight + 'px';

            }

    });

}