function profileError(){

    let first_name_inp = $("input[name=first_name_inp]").val();

    if( first_name_inp === ''){

        error();
        $('.error_info p').text('لطفا نام خود را وارد کنید .')
        return false;

    }
    else{
        return true;
    }

}