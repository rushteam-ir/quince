$(document).ready(function () {

    $(document).on('click', '.close_dsh_btn', function () {

        dashboard_collaps_jq.removeClass('collaps_on');
        main_cms_field.addClass('MCF_larg');
        dashboard.removeClass('open_dsh');
        dashboard.addClass('close_dsh');
        dashboard_logo.removeClass('opacity_on');
        dashboard_logo.addClass('opacity_none');

        for (let i = 0; i < dashboard_collaps.length; i++) {

            var test = dashboard_collaps[i].nextElementSibling;
            test.style.maxHeight = null;

        }

        hover_field.css('display', 'block');
        sessionStorage.oc = 1;

    });

    $(document).on('click', '.open_dsh_btn', function () {

        main_cms_field.removeClass('MCF_larg');
        hover_field.css('display', 'none');
        dashboard.removeClass('close_dsh');
        dashboard.addClass('open_dsh');
        dashboard_logo.removeClass('opacity_none');
        dashboard_logo.addClass('opacity_on');
        sessionStorage.oc = 2;

    });

});