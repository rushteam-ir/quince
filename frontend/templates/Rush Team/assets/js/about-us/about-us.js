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


for(let i = 0 ; i <= 6 ; i++){

    $('.property_of_rush_team_jquery').eq(i).children().eq(1).mouseover(function(){

        for(let j = 0 ; j <= 6 ; j++){

            $('.property_of_rush_team_jquery').eq(j).children().eq(1).removeClass('mouseover_change_color_icon_of_property');
            $('.property_of_rush_team_jquery').eq(j).children().eq(0).removeClass('display_of_explain_about_property_rush_team');

        }

        $(this).addClass('mouseover_change_color_icon_of_property');
        $(this).prev().addClass('display_of_explain_about_property_rush_team');


    });





}
