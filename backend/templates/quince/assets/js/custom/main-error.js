let errors = $('.error_info');

// open error
function error(){

   $('.error_info').addClass('warning_error');
   $('.error_info').removeClass('success_error');


   errors.removeClass('error_disable , error_d_none');
   errors.addClass('error_d_block');
    
    setTimeout(function(){

       errors.addClass('error_active');

    },100);

}

// close error
$('.error_info :last-child').click(function(){

   errors.removeClass('error_d_block , error_active');
   errors.addClass('error_disable');
    
    setTimeout(function(){

       errors.addClass('error_d_none');

    },400);

});