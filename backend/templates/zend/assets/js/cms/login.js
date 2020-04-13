// login errors

function adminlogerrors() {

    $('.alert_query').remove();

    var email_inp = document.forms['dashbord_login_form']['email_inp'].value;
    var password_inp = document.forms['dashbord_login_form']['password_inp'].value;
    var captcha_inp = document.forms['dashbord_login_form']['captcha_inp'].value;
    var error_text = document.getElementById('error_text');

    var error_field = document.getElementById('error_field_warning_front');


    if (email_inp == "") {

        error_field.style.display = "block";
        error_text.innerHTML = "لطفا ایمیل خود را وارد کنید";
        return false;

    } else if (!email_inp.includes('@') || !email_inp.includes(".com") || email_inp.length <= 9) {

        error_field.style.display = "block";
        error_text.innerHTML = "ایمیل وارد شده معتبر نمی باشد.";
        return false;

    } else if (password_inp == "") {

        error_field.style.display = "block";
        error_text.innerHTML = "لطفا رمز عبور خود را وارد کنید.";
        return false;

    } 
    
    else if(password_inp.length < 8){

        error_field.style.display = "block";
        error_text.innerHTML = "رمز عبور کم تر از حد مجاز است.";
        return false;

    }

    else if (captcha_inp == "") {

        error_field.style.display = "block";
        error_text.innerHTML = "لطفا کد امنیتی را وارد نمایید.";
        return false;
    }

}

// recovery errors

function recoveryfunc() {

    $('.alert_query').remove();

    var email_inp = document.forms['dashbord_login_form']['email_inp'].value;
    var error_text = document.getElementById('error_text');
    var error_field = document.getElementById('error_field_warning_front');

    if (email_inp == "") {

        error_field.style.display = "block";
        error_text.innerHTML = "لطفا ایمیل خود را وارد کنید."
        return false;

    } else if (email_inp.length <= 11 || !email_inp.include("@") || !email_inp.include(".com")) {

        error_field.style.display = "block";
        error_text.innerHTML = "لطفا یک ایمیل معتبر وارد نمایید ."
        return false;

    }

}

// recovery-verify errors

function recoveryVerify() {

    $('.alert_query').remove();

    var newpass_inp = document.forms['dashbord_login_form']['newpass_inp'].value;
    var compass_inp = document.forms['dashbord_login_form']['compass_inp'].value;

    var main_field = document.getElementById('error_field_warning_front');
    var error_text = document.getElementById('error_text');

    if (newpass_inp == "") {

        main_field.style.display = "block";
        error_text.innerHTML = "لطفا رمز عبور جدید خود را وارد نمایید."
        return false;

    } else if (compass_inp == "") {

        main_field.style.display = "block";
        error_text.innerHTML = "لطفا تکرار رمز عبور را وارد نمایید."
        return false;

    } else if (newpass_inp !== compass_inp) {

        main_field.style.display = "block";
        error_text.innerHTML = "رمز عبور جدید و تکرار آن یکی نیست."
        return false;

    }



}