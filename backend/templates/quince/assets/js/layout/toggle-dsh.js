$(document).ready(function(){

    function close_dsh(){

        dashboard_collaps.removeClass('collaps_on');
        dashboard.removeClass('open_dsh');
        dashboard.addClass('close_dsh');
        main_cms_field.css('width','96.2%');
        localStorage.collaps_dsh = close_dsh;

    }

    function open_dsh(){

        dashboard.removeClass('close_dsh');
        dashboard.addClass('open_dsh');
        main_cms_field.css('width','85%');
        localStorage.collaps_dsh = open_dsh;

    }

    $(document).on('click','.close_dsh_btn',function(){

        close_dsh()

    });

    $(document).on('click','.open_dsh_btn',function(){


        open_dsh();

    });

    if(localStorage.collaps_dsh == open_dsh){

        open_dsh();
    
    }
    
    else{
    
        close_dsh()
    
    }

});