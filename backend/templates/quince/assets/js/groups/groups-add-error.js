let err = new errorHandler();

function adminAddError() {

    let email_inp = $('input[name=email_inp]').val();
    let password_inp = $('input[name=password_inp]').val();
    let confirm_password_inp = $('input[name=confirm_password_inp]').val();
    let access_inp = $('input[name=access_inp]').val();

    let validation_result = null;

    validation_result = err.initiate([

        { value : email_inp, type : 'empty'},
        { value : email_inp, type : 'email'},
        { value : password_inp, type : 'empty'},
        { value : password_inp, type : 'password'},
        { value : confirm_password_inp, type : 'empty'},
        { value : confirm_password_inp, type : 'password'},
        { value : access_inp, type : 'empty'},

    ]);

    if(validation_result){

        error();
        $('.error_info p').text(validation_result);
        return false;

    }
    else{

        return true;

    }

}