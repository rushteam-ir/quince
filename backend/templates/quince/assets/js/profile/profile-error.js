function proInfo(){
    let test = $("input[name=first_name_inp]").val();

    if( test.length < 20){

        error();
        $('.error_info p').text('رمز عبور شما کم تر از 8 رقم است.')
        return false;

    }

}
