$('.counter_of_number').each(function () {
    $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
    }, {
        duration: 1500,
        easing: 'linear',
        step: function (now) {
            $(this).text(Math.ceil(now));
        }
    });
});


$(document).ready(function () {
    $('.property_1')
        .eq(1)
        .mouseover(function () {
            $('.property_1').eq(0).fadeIn();
            $('.property_1').eq(1).css('background-image', 'linear-gradient(to right, #3D52EF, #55B9FC)');
            $(' .icons_of_property_rush_team').eq(0).addClass('mouseover_change_color_icon_of_property');
        })
        .mouseout(function () {
            $('.property_1').eq(0).fadeOut();
            $('.property_1').eq(1).css('background-image', 'none');
            $(' .icons_of_property_rush_team').eq(0).removeClass('mouseover_change_color_icon_of_property');
        })
});