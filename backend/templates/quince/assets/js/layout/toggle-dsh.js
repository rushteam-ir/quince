$(document).ready(function () {

    $(document).on('click', '.close_dsh_btn', function () {

        dashboard_collaps_jq.removeClass('collaps_on');
        main_cms_field.addClass('MCF_larg');
        dashboard.removeClass('open_dsh');
        dashboard.addClass('close_dsh');
        dashboard_logo.fadeOut(1000);

        hover_field.css('display', 'block');

        for (let i = 0; i < dashboard_collaps.length; i++) {

            var test = dashboard_collaps[i].nextElementSibling;
            test.style.maxHeight = null;

        }

    });

    $(document).on('click', '.open_dsh_btn', function () {

        main_cms_field.removeClass('MCF_larg');
        hover_field.css('display', 'none');
        dashboard.removeClass('close_dsh');
        dashboard.addClass('open_dsh');

    });

});