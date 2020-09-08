$(document).on('click', '.content_row', function(){

    let path = $(this).attr('path');

    if($(this).attr('is-file') != 'true'){

        $.ajax({
            url : `${backend_url}api/file-manager/content-load`,
            type : 'POST',
            data : {
                path : path
            },

        })
            .done((data)=>{

                loadNewContent(data);

            })

    }
    else{

        redirect(`${backend_url}api/file-manager/download/?path=${path}`);

    }

})

function loadNewContent(data_list){

    let image_type = ['.png', '.jpeg', '.jpg', '.gif', '.PNG', '.JPG', '.JPEG', '.GIF'];
    $('.content_row').remove();

    for(let data of data_list){

        let icon = ``;

        if(!data.isFile){

            icon = `<i class="fas fa-folder"></i>`;

        }
        else{

            if(image_type.includes(data.type)){
                icon = `<i class="fad fa-file-image"></i>`
            }
            else{
                icon = `<i class="fad fa-file"></i>`
            }

        }

        let new_content_row = `
        
            <tr class="content_row" path="${data.path}" is-file="${data.isFile}">
                <td class="FM_check_box">
                    <label class="checkbox_of_category">
                        <input type="checkbox" name="delete_checkbox[]" class="table_checkbox option-input checkbox"
                               value="${data.path}">
                    </label>
                </td>
                <td class="FM_icons">
                    ${icon}
                </td>
                <td class="text-right pr-0">
                    ${data.name}
                </td>
                <td class="FM_info">
                    ${data.modified}
                </td>
                <td class="FM_info">
                    ${data.size}
                </td>

                <td class="table_option FM_info">
                    <div class="dropdown">
                        <button class="btn  dropdown-toggle" type="button" id="table_option" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                        <div class="dropdown-menu" aria-labelledby="table_option">
                            <a class="dropdown-item" href="#">
                                <i class="fal fa-align-slash"></i>
                                غیر فعال کردن
                            </a>
                            <a class="dropdown-item" href="#">
                                <i class="fal fa-asterisk"></i>
                                افزودن وی ای پی
                            </a>
                            <a class="dropdown-item" href="#">
                                <i class="fal fa-assistive-listening-systems"></i>
                                افزودن گوش و چشم
                            </a>
                        </div>
                    </div>
                </td>
            </tr>
        
        `;

        $('.Q_table').append(new_content_row);

    }

}

function redirect(url) {
    location.href = url
}