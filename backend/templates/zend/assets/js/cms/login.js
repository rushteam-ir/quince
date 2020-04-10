function adminlogerrors(){

    $('.alert_query').remove();

    var username_inp = document.forms['dashbord_login_form']['username_inp'].value;
    var password_inp = document.forms['dashbord_login_form']['password_inp'].value;
    var captcha_inp = document.forms['dashbord_login_form']['captcha_inp'].value;

    var error_field = document.getElementById('error_field_warning_front');
    var error_text = document.getElementById('error_text');

    
    error_field.style.display = " block";

    if(username_inp == ""){

        error_text.innerHTML ="لطفا نام کاربری خود را وارد کنید.";
        return false;
        
    }
    
    else if(password_inp == ""){

        error_text.innerHTML ="لطفا رمز عبور خود را وارد کنید.";
        return false;

    }

    else if(captcha_inp == ""){

        error_text.innerHTML = "لطفا کد امنیتی را وارد نمایید.";
        return false;
    }

    else if (captcha_inp !== "" && password_inp !== "" && username_inp !== ""){

        error_field.style.display = "none";

    }

    


}

// function removeQuery(){
//
//     var error_field_success = document.getElementById('error_field_success');
//     var error_field_warning = document.getElementById('error_field_warning');
//
//     if(error_field_warning != 'null'){
//
//         error_field_warning.style.display ="none";
//
//     }
//     if(error_field_success != "null"){
//
//         error_field_success.style.display = "none";
//
//     }
//
// }
