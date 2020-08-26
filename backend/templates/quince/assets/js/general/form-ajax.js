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

    let fd_object = new FormData();
    let post_url = $(this).attr("action");
    let request_method = $(this).attr("method");
    let form_type = $(this).attr("name");
    let form_data = getFormData($(this), fd_object);

    let isFileUpload = document.getElementsByClassName('ajax_file');
    let ajax_options = {
        url : post_url,
        method: request_method,
        dataType : 'json',
        contentType : false,
        processData : false,
    }

    switch(form_type){

        case 'profile':
        {

            let front_validation = profileError();
            if(!front_validation) return false;
            break;

        }
        case 'category':
        {

            let front_validation = categoryError();
            if(!front_validation) return false;
            break;

        }
        case 'article':
        {

            let front_validation = articleError();
            if(!front_validation) return false;
            break;

        }
        case 'access':
        {

            let front_validation = accessError();
            if(!front_validation) return false;
            break;

        }
        case 'adminAdd':
        {

            let front_validation = adminAddError();
            if(!front_validation) return false;
            break;

        }
        case 'comments':
        {

            let front_validation = commentsError();
            if(!front_validation) return false;
            break;

        }
        case 'contact':
        {

            let front_validation = contactsError();
            if(!front_validation) return false;
            break;

        }
        case 'login':
        {

            let front_validation = loginError();
            if(!front_validation) return false;
            break;

        }

    }

    if (Object.keys(form_data).length == 0 && isFileUpload.length > 0) {

        let files = $('.ajax_file')[0].files[0];
        let file_name = $('.ajax_file').attr('name');
        form_data.append(file_name, files);

    }

    ajax_options.contentType = false;
    ajax_options.processData = false;
    ajax_options.data = form_data;

    $.ajax(ajax_options).done(function(response){
        if(response.status == 'success'){
            sessionStorage.setItem('reload', 'true');
            sessionStorage.setItem('message', response.msg);
            redirect(response.url);
        }
        else if(response.status == 'success-noMsg'){
            redirect(response.url);
        }
        else{
            showMessage(response)
        }

    });

});

function getFormData($form, form_data){
    var unindexed_array = $form.serializeArray();

    $.map(unindexed_array, function(n, i){
        form_data.append([n['name']], n['value']);
    });

    return form_data;
}

function showMessage(text){

    error();
    $('.error_info p').text(text)
    return false;

}

function redirect(url) {
    location.href = url
}