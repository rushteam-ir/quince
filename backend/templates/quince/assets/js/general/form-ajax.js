$('#form_ajax').submit(function(event){

    event.preventDefault();

    let post_url = $(this).attr("action");
    let request_method = $(this).attr("method");
    let form_data = getFormData($(this));

    $.ajax({
        url : post_url,
        method: request_method,
        data : form_data
    }).done(function(response){
        if(response == 'success'){

            sessionStorage.setItem('reload', true);
            sessionStorage.setItem('message', response);
            location.reload();

        }
        else{

            proInfo(response)

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

function proInfo(text){

    error();
    $('.error_info p').text(text)
    return false;

}

$( function () {
        if(sessionStorage.getItem('reload')) {
            proInfo(sessionStorage.getItem('message'));
            sessionStorage.setItem('reload', false);
        }
    }
);