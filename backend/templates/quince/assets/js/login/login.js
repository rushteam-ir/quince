// errors

let error_box = document.getElementById('error_field_warning_front');
let error_text = document.getElementById('error_text');

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

$(document).on('click', '.refresh_capthcha', function () {

    $('.img_captcha').attr('src', `${captcha_url}?_` + Math.random());

});


function removeWarningErrorFront(){

    document.getElementById('error_field_warning_front').style.display = 'none';
    
}

function redirect(url) {
    location.href = url
}