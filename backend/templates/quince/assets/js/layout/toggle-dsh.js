$(document).ready(function(){

    $(document).on('click','.close_dsh_btn',function(){

        dashboard.removeClass('open_dsh');
        dashboard.addClass('close_dsh');
        main_cms_field.css('width','96.2%');

    });


    $(document).on('click','.open_dsh_btn',function(){

        dashboard.removeClass('close_dsh');
        dashboard.addClass('open_dsh');
        main_cms_field.css('width','85%');

    });

});
