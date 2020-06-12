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

    $('.test').eq(i).children().eq(1).mouseover(function(){

        for(let j = 0 ; j <= 6 ; j++){

            $('.test').eq(j).children().eq(1).removeClass('test_class');

        }

        $(this).addClass('test_class');
        
    });

}
