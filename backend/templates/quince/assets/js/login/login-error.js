let err = new errorHandler();

function loginError() {

    let email_inp = $('input[name=email_inp]').val();
    let password_inp = $('input[name=password_inp]').val();
    let captcha_inp = $('input[name=captcha_inp]').val();

    let validation_result = null;

    validation_result = err.initiate([

        { value : email_inp, type : 'email'},
        { value : password_inp, type : 'password'},
        { value : captcha_inp, type : 'empty'},

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