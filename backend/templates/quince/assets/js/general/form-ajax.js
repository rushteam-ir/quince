$( function () {
        if(sessionStorage.getItem('reload') == 'true') {
            showMessage(sessionStorage.getItem('message'));
            $('.error_info').addClass('success_error')
            sessionStorage.setItem('reload', 'false');
        }
    }
);

$('.form_ajax').submit(function(event){

    event.preventDefault();

    let front_validation =  profileError();
    if(!front_validation) return false;

    let post_url = $(this).attr("action");
    let request_method = $(this).attr("method");
    let form_data = getFormData($(this));
    let isFileUpload = document.getElementsByClassName('ajax_file');
    let ajax_options = {
        url : post_url,
        method: request_method,
        dataType : 'json'
    }

    if (Object.keys(form_data).length == 0 && isFileUpload.length > 0) {

        form_data = new FormData();
        let files = $('.ajax_file')[0].files[0];
        form_data.append('avatar',files);

        ajax_options.contentType = false;
        ajax_options.processData = false;

    }

    ajax_options.data = form_data;

    $.ajax(ajax_options).done(function(response){
        if(response.status == 'success'){

            sessionStorage.setItem('reload', 'true');
            sessionStorage.setItem('message', response.msg);
            redirect(response.url);

        }
        else{

            showMessage(response)

        }

    });

});

function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

function showMessage(text){

    error();
    $('.error_info p').text(text)
    return false;

}

function redirect(url) {
    location.href = url
}