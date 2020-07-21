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

function redirect(url) {
    location.href = url
}