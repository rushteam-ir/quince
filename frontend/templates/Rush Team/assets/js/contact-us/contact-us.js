$(document).ready(function(){

    let q_box = $('.repetitive_questions_box');

    for(let i = 0 ; i < q_box.length ; i++){

        q_box.eq(i).click(function(){

            $(this).next().slideToggle();

        });
x
    }


});