$(document).ready(function () {

    function apiFileManager(this_data){

        $.post(`${backend_url}api/file-manager`, this_data, (data, status)=>{

            console.log(status);
            console.log(data);

        });

    }

    function apiTableManager(this_data){

        $.post(`${backend_url}api/table-manager`, this_data, (data, status)=>{

            console.log(status);
            console.log(data);

        });

    }

})
