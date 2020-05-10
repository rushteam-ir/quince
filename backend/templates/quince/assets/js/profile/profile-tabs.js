$(document).ready(function () {

    let profile_tab = $('.profile_tab');
    let pro_field = $('.main_field_of_left_pro');

    $(document).on('click', '.profile_tab', function () {

        profile_tab.removeClass('profile_tab_active');
        $(this).addClass('profile_tab_active');

    });

    profile_tab.eq('0').click(function () {

        pro_field.css('display', 'none');
        pro_field.eq('0').css('display', 'block');
        sessionStorage.profileTab = '1';

    });

    profile_tab.eq('1').click(function () {

        pro_field.css('display', 'none')
        pro_field.eq('1').css('display', 'block');
        sessionStorage.profileTab = '2';

    });


    profile_tab.eq('2').click(function () {

        pro_field.css('display', 'none');
        pro_field.eq('2').css('display', 'block');
        sessionStorage.profileTab = '3';

    });

    if(sessionStorage.profileTab =='1'){

        profile_tab.removeClass('profile_tab_active');
        profile_tab.eq('0').addClass('profile_tab_active');
        pro_field.css('display', 'none')
        pro_field.eq('0').css('display', 'block');

    }

    else if(sessionStorage.profileTab == '2'){

        profile_tab.removeClass('profile_tab_active');
        profile_tab.eq('1').addClass('profile_tab_active');
        pro_field.css('display', 'none')
        pro_field.eq('1').css('display', 'block');
    
    }

    else if(sessionStorage.profileTab == '3'){

        profile_tab.removeClass('profile_tab_active');
        profile_tab.eq('2').addClass('profile_tab_active');
        pro_field.css('display', 'none')
        pro_field.eq('2').css('display', 'block');
    
    }

    $('#first_tab').removeClass('display_none');

});


