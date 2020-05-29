
$(document).ready(function(){

    $(document).on('click','.close_dsh_btn',function(){

        dashboard.addClass('close_dsh');
        main_cms_field.css('width','97.5%');

    });


    $(document).on('click','.open_dsh_btn',function(){

        dashboard.addClass('open_dsh');
        main_cms_field.css('width','85%');

    });

});
