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

function redirect(url) {
    location.href = url
}