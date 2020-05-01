let recovery_page = document.getElementById('recovery_page');
let mainBox = document.querySelector('.main_filed_of_login');

let back_btn_log = document.querySelector('.back_btn_log');
let back_to_recovery = document.querySelector('.back_to_recovery');
let go_verify = document.querySelector('.go_verify');

let recovery_form = document.querySelector('.recovery_form');
let log_form = document.querySelector('.log_form');
let verify_form = document.querySelector('.recovery_verify_form');

if (sessionStorage.recovery == 2) {

    recovery_form.style.display = 'block';
    log_form.style.display = 'none';
    recovery_form.style.opacity = '1';
    mainBox.style.height = '400px';
    verify_form.style.display = 'none';
    mainBox.style.transition = 'none';

}

if (sessionStorage.recovery == 3) {

    log_form.style.display = 'none';
    verify_form.style.display = 'block';
    recovery_form.style.display = 'none';
    verify_form.style.opacity = '1';
    mainBox.style.height = '350px';
    mainBox.style.transition = 'none';

}

// go to recovery page

recovery_page.addEventListener('click', function () {

    document.getElementById('error_box_2').style.display = 'none';
    sessionStorage.recovery = 2;
    log_form.style.opacity = '0';
    mainBox.style.transition = 'all ease-out 0.2s';

    setTimeout(function () {

        recovery_form.style.display = 'block';
        log_form.style.display = 'none';
        mainBox.style.height = '400px';

    }, 400);

    setTimeout(function () {

        recovery_form.style.opacity = '1';

    }, 500);

});

// back to log

back_btn_log.addEventListener('click', function () {

    document.getElementById('error_box_1').style.display = 'none';
    sessionStorage.recovery = 1;
    recovery_form.style.opacity = '0';
    mainBox.style.transition = 'all ease-out 0.2s';

    setTimeout(function () {

        recovery_form.style.display = 'none';
        log_form.style.display = 'block';
        mainBox.style.height = '450px';

    }, 400);

    setTimeout(function () {

        log_form.style.opacity = '1';

    }, 500);

});

// go to verify

go_verify.addEventListener('click', function () {


    let email_inp = document.forms['recovery_form']['recovery_email_inp'].value;
    document.getElementById('error_box_3').style.display = 'none';

    let error_box_2 = document.getElementById('error_box_2');
    let error_text_2 = document.getElementById('error_text_2');

    if (email_inp == '') {


        error_box_2.style.display = 'block'
        error_text_2.innerText = 'لطفا ایمیل خود را وارد کنید.';
        mainBox.style.transition = 'all ease-out 0.2s';
        mainBox.style.height = '440px';
        return false;

    } else if (!email_inp.includes('@') || !email_inp.includes('.com') || email_inp.length < 9) {

        error_box_2.style.display = 'block'
        error_text_2.innerText = 'ایمیل وارد شده صحیح نمی باشد.';
        mainBox.style.transition = 'all ease-out 0.2s';
        mainBox.style.height = '440px';
        return false;

    }

    sessionStorage.recovery = 3;
    recovery_form.style.opacity = '0';
    mainBox.style.transition = 'all ease-out 0.2s';

    setTimeout(function () {

        recovery_form.style.display = 'none';
        verify_form.style.display = 'block';
        mainBox.style.height = '350px';

    }, 400);

    setTimeout(function () {

        verify_form.style.opacity = '1';

    }, 500);

});

//back to recovery

back_to_recovery.addEventListener('click', function () {

    sessionStorage.recovery = 2;
    verify_form.style.opacity = '0';
    mainBox.style.transition = 'all ease-out 0.2s';
    document.getElementById('error_box_2').style.display = 'none';

    setTimeout(function () {

        recovery_form.style.display = 'block';
        verify_form.style.display = 'none';
        mainBox.style.height = '400px';

    }, 400);

    setTimeout(function () {

        recovery_form.style.opacity = '1';

    }, 500);

});


// errors

function loginError() {

    $('.server_error').remove();

    let email_inp = document.forms['login_form']['email_inp'].value;
    let password_inp = document.forms['login_form']['password_inp'].value;
    let captcha_inp = document.forms['login_form']['captcha_inp'].value;

    let error_box_1 = document.getElementById('error_box_1');
    let error_text = document.getElementById('error_text');



    if (email_inp == '') {

        errorfunc();
        error_text.innerText = 'لطفا ایمیل خود را وارد کنید.';
        return false;

    } else if (!email_inp.includes('@') || !email_inp.includes('.com') || email_inp.length < 9) {

        errorfunc();
        error_text.innerText = 'ایمیل وارد شده صحیح نمی باشد.';
        return false;

    } else if (password_inp == '') {

        errorfunc();
        error_text.innerText = 'لطفا رمز عبور خود را وارد کنید.';
        return false;

    } else if (password_inp.length < 8) {

        errorfunc();
        error_text.innerText = 'رمز عبور کم تر از حد مجاز است.';
        return false;

    } else if (captcha_inp == '') {

        errorfunc();
        error_text.innerText = 'لطفا کد امنیتی را وارد کنید';
        return false;

    } else if (captcha_inp.length < 5) {

        errorfunc();
        error_text.innerText = 'کد امنیتی کم تر از حد مجاز است.';
        return false;

    }



    let error_box_5 = document.getElementById('error_box_5');
    let error_text_5 = document.getElementById('error_text_5');
    let server_msg = $('.server_error').attr('name');

    error_box_5.style.display = 'block';
    mainBox.style.height = '500px';
    mainBox.style.transition = 'all ease-out 0.2s';
    error_text_5.innerHTML = server_msg;
    return false;

}

function verifyError(){

    let password = document.forms['verify_form']['new_password_inp'].value;

    let error_box_3 = document.getElementById('error_box_3');
    let error_text = document.getElementById('error_text_3');

    if(password == ''){

        error_box_3.style.display ='block'
        error_text.innerText = 'لطفا رمز عبور را وارد کنید.';
        mainBox.style.height = '400px';
        mainBox.style.transition = 'all ease-out 0.2s';
        return false;

    }

}


function errorBowRemove1() {

    document.getElementById('error_box_1').style.display = 'none';
    mainBox.style.height = '450px';
    boxHeight();

}

function errorBowRemove2() {

    document.getElementById('error_box_2').style.display = 'none';
    mainBox.style.height = '410px';
    boxHeight();

}

function errorBowRemove3() {

    document.getElementById('error_box_3').style.display = 'none';
    mainBox.style.height = '350px';
    boxHeight();

}

function boxHeight() {

    mainBox.style.transition = 'all ease-out 0.2s';

}

function errorfunc() {

    error_box_1.style.display = 'block';
    mainBox.style.height = '500px';
    mainBox.style.transition = 'all ease-out 0.2s';

}

function Errors(){

    let error_box_5 = document.getElementById('error_box_5');
    let error_text_5 = document.getElementById('error_text_5');

    error_box_5.style.display = 'block';
    mainBox.style.height = '500px';
    mainBox.style.transition = 'all ease-out 0.2s';
    error_box_1.style.display = 'block';
    error_text.innerHTML = text;
}