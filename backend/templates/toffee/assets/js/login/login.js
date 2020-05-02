
// errors

function loginError() {


    let email_inp = document.forms['login_form']['email_inp'].value;
    let password_inp = document.forms['login_form']['password_inp'].value;
    let captcha_inp = document.forms['login_form']['captcha_inp'].value;

    let error_box_1 = document.getElementById('error_box_1');
    let error_text = document.getElementById('error_text');



    if (email_inp == '') {

        error_box_1.style.display = "block";
        error_text.innerText = 'لطفا ایمیل خود را وارد کنید.';
        return false;

    } else if (!email_inp.includes('@') || !email_inp.includes('.com') || email_inp.length < 9) {

        error_box_1.style.display = "block";     
        error_text.innerText = 'ایمیل وارد شده صحیح نمی باشد.';
        return false;

    } else if (password_inp == '') {
         
        error_box_1.style.display = "block";
        error_text.innerText = 'لطفا رمز عبور خود را وارد کنید.';
        return false;

    } else if (password_inp.length < 8) {
         
        error_box_1.style.display = "block";
        error_text.innerText = 'رمز عبور کم تر از حد مجاز است.';
        return false;

    } else if (captcha_inp == '') {
         
        error_box_1.style.display = "block";
        error_text.innerText = 'لطفا کد امنیتی را وارد کنید';
        return false;

    } else if (captcha_inp.length < 5) {
         
        error_box_1.style.display = "block";
        error_text.innerText = 'کد امنیتی کم تر از حد مجاز است.';
        return false;

    }

}

function verifyError() {

    let password = document.forms['verify_form']['new_password_inp'].value;

    let error_box_3 = document.getElementById('error_box_3');
    let error_text = document.getElementById('error_text_3');

    if (password == '') {

        error_box_3.style.display = 'block'
        error_text.innerText = 'لطفا رمز عبور را وارد کنید.';
        return false;

    }

}
