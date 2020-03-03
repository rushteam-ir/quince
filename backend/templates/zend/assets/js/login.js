function adminlogerrors() {
    var usernameError = document.forms['dashbord_login_form']['username_inp'].value;
    var passwordError = document.forms['dashbord_login_form']['password_inp'].value;
    var captchaError = document.forms['dashbord_login_form']['captcha_inp'].value;
    var errorField = document.getElementById('dashbord_login_error');
    if (usernameError == '') {
        errorField.style.display = "block";
        errorField.innerHTML = "لطفا نام کاربری را وارد کنید";
        return false;
    } else if (passwordError == '') {
        errorField.style.display = "block";
        errorField.innerHTML = "لطفا رمز عبور خود را وارد کنید";
        return false;

    } else if (captchaError == '') {
        errorField.style.display = "block";
        errorField.innerHTML = "لطفا کد امنیتی را وارد کنید";
        return false;
    }
}
