$(document).ready(function(){

    $(document).on('click','.close_dsh_btn',function(){

        dashboard_collaps_jq.removeClass('collaps_on');
        dashboard.removeClass('open_dsh');
        dashboard.addClass('close_dsh');
        main_cms_field.css('width','96.2%');

        for (let i = 0; i < dashboard_collaps.length; i++) {

           var test = dashboard_collaps[i].nextElementSibling;
           test.style.maxHeight = null;

        }

        hover_field.css('display','block');

    });

    $(document).on('click','.open_dsh_btn',function(){

        dashboard.removeClass('close_dsh');
        dashboard.addClass('open_dsh');
        main_cms_field.css('width','85%');
        hover_field.css('display','none');

    });

});