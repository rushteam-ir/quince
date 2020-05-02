// errors

let error_box = document.getElementById('error_field_warning_front');
let error_text = document.getElementById('error_text');

function loginError() {

    let email_inp = document.forms['login_form']['email_inp'].value;
    let password_inp = document.forms['login_form']['password_inp'].value;
    let captcha_inp = document.forms['login_form']['captcha_inp'].value;

    if (email_inp == '') {

        error_box.style.display = 'block';
        error_text.innerText = 'لطفا ایمیل خود را وارد کنید.';
        return false;

    } else if (!email_inp.includes('@') || !email_inp.includes('.com') || email_inp.length < 9) {

        error_box.style.display = 'block';     
        error_text.innerText = 'ایمیل وارد شده صحیح نمی باشد.';
        return false;

    } else if (password_inp == '') {
         
        error_box.style.display = 'block';
        error_text.innerText = 'لطفا رمز عبور خود را وارد کنید.';
        return false;

    } else if (password_inp.length < 8) {
         
        error_box.style.display = 'block';
        error_text.innerText = 'رمز عبور کم تر از حد مجاز است.';
        return false;

    } else if (captcha_inp == '') {
         
        error_box.style.display = 'block';
        error_text.innerText = 'لطفا کد امنیتی را وارد کنید';
        return false;

    } else if (captcha_inp.length < 5) {
         
        error_box.style.display = 'block';
        error_text.innerText = 'کد امنیتی کم تر از حد مجاز است.';
        return false;

    }

}

function recoveryError(){

    let email_inp = document.forms['recovery_form']['email_inp'].value;

    if (email_inp == '') {

        error_box.style.display = 'block';
        error_text.innerHTML = 'لطفا ایمیل خود را وارد کنید.'
        return false;

    } else if (!email_inp.includes('@') || !email_inp.includes('.com') || email_inp.length < 9) {

        error_box.style.display = 'block';     
        error_text.innerText = 'ایمیل وارد شده صحیح نمی باشد.';
        return false;

    }

}

function verifyError() {

    let password = document.forms['verify_form']['new_password_inp'].value;

    if (password == '') {

        error_box.style.display = 'block'
        error_text.innerText = 'لطفا رمز عبور را وارد کنید.';
        return false;

    }

}


function removeWarningErrorFront(){

    document.getElementById('error_field_warning_front').style.display = 'none';
    
}

function redirect(url) {
    location.href = url
}