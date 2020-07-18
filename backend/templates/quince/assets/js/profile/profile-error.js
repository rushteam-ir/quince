function proInfo(){


}

$('#form_ajax').submit(function(){

    let test = $("input[name=first_name_inp]").val();
    let test1 = $("input[name=last_name_inp]").val();

    if( test.length < 20){

        error();
        $('.error_info p').text('رمز عبور شما کم تر از 8 رقم است.')
        return false;

    }

    if( test1.length < 10){

        error();
        $('.error_info p').text('رمز عبور شما کم تر از 10 رقم است.')
        return false;

    }
    
});