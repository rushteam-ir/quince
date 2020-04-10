function adminlogerrors(){

    var username_inp = document.forms['dashbord_login_form']['username_inp'].value;
    var password_inp = document.forms['dashbord_login_form']['password_inp'].value;
    var captcha_inp = document.forms['dashbord_login_form']['captcha_inp'].value;

    var error_field = document.getElementById('error_field_danger');
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

        error_field.style.display = "none"

    }

}