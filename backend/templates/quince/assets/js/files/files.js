$('.files_table_row').click(function(){

    $.post(`${backend_url}api/file-manager/content-load`, {
        path : $(this).attr('name')
    }, (data, status)=>{

        console.log(data)

    });

})