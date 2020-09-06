$('.content_row').click(function(){

    let path = $(this).attr('path');

    if($(this).attr('is-file') != 'true'){

        $.post(`${backend_url}api/file-manager/content-load`, {
            path : path
        }, (data, status)=>{



        });

    }
    else{

        $.post(`${backend_url}api/file-manager/download/${Math.random()}`, {
            path : path
        }, (data, status)=>{});

    }

})

function redirect(url) {
    location.href = url
}