function apiFileManager(this_data){

    $.post(`${backend_url}api/file-manager`, this_data, (data, status)=>{

        console.log(status);
        console.log(data);

    });

}