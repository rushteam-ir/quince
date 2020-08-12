let nav_modal_data =  $('.nav_modal_data')

for(let i = 0 ; i < nav_modal_data.length ; i++){

    nav_modal_data.eq(i).click(function(){

        $(this).next().fadeToggle(200);

    });

}