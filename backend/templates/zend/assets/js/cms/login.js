function adminlogerrors(){

    var username_inp = document.forms['dashbord_login_form']['username_inp'].value;
    // var password_inp = document.forms['dashbord_login_form']['password_inp'].value;
    // var captcha_inp = document.forms['dashbord_login_form']['captcha_inp'].value;

    var error_field = document.getElementById('error_field_danger');
    var error_text = document.getElementById('error_text');

    if(username_inp == ""){

        error_field.style.display = "block";
        error_text.innerHTML ="sasdasdas";
        return false;
        
    }

}