$(document).ready(function () {

    $('#selectall').trigger('change');
    sessionStorage.modal = '0';

    $('.limit_row').change(function () {

        let page_limit = $(this).val();
        $.post(`${backend_url}api/get-page-limit`, {
            limit: page_limit,
            url: `${backend_url}files`,
        }, function (data, status) {

            redirect(`${backend_url}files`);

        })

    })

});

$('.download_btn').click(function (){

    let path = $(this).attr('name');

    redirect(`${backend_url}api/file-manager/download/?path=${path}`)

})

$('.table_home_btn').click(function (){

    redirect(`${backend_url}files`)

})

$('.table_backward_btn').click(function (){

    let path = $(this).attr('name');

    redirect(`${backend_url}files/?path=${path}`)

})

function redirect(url) {
    location.href = url
}