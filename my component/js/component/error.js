function submitE(){
    let test = $("input[name=test]").val();

    if( test.length < 20){

        error();
        $('.error_info p').text('رمز عبور شما کم تر از 8 رقم است.')
        return false;

    }

}