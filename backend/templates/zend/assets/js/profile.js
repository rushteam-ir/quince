var first_pro_box = document.getElementById('first_pro_box');
var second_pro_box = document.getElementById('second_pro_box');
var admin_pro_edit = document.getElementById('admin_pro_edit');
var admin_change_pass = document.getElementById('admin_change_pass');

// switch tab js
function firstChangeDisplay(){

    admin_pro_edit.style.display = "block"
    admin_change_pass.style.display = "none";
    second_pro_box.style.backgroundColor = "#F7F8FB";
    first_pro_box.style.backgroundColor = "white";
}

function secondChangeDisplay() {

    admin_change_pass.style.display = "block";
    admin_pro_edit.style.display = "none";
    second_pro_box.style.backgroundColor = "white";
    first_pro_box.style.backgroundColor = "#F7F8FB";
}



// password error js
function passerror() {

    var admin_profile_error_field_pass = document.getElementById('admin_profile_error_field_pass');
    var current_password = document.forms['admin_pro_pass_edit']['current_password'].value;

    var new_password = document.forms['admin_pro_pass_edit']['new_password'].value;
    var confirm_password = document.forms['admin_pro_pass_edit']['confirm_password'].value;

    if (current_password == '' || new_password == "" || confirm_password == "")

    {

        admin_profile_error_field_pass.style.display = "block";
        admin_profile_error_field_pass.innerHTML = "لطفا تمام ورودی ها را پر کنید"
        return false;

    } 
    
    else if (new_password !== confirm_password)

    {

        admin_profile_error_field_pass.style.display = "block";
        admin_profile_error_field_pass.innerHTML = "رمز جدید و تکرار آن مشابه نیستند"
        return false;

    }

}


function proError() {
    var admin_profile_error_field = document.getElementById('admin_profile_error_field');
    var username_inp = document.forms['pro_op_main_form']['username_inp'].value;
    var firstname_inp = document.forms['pro_op_main_form']['firstname_inp'].value;
    var lastname_inp = document.forms['pro_op_main_form']['lastname_inp'].value;
    var email_inp = document.forms['pro_op_main_form']['email_inp'].value;
    var phonenumber_inp = document.forms['pro_op_main_form']['phonenumber_inp'].value;

    if (username_inp == "" || firstname_inp == "" || lastname_inp == "" || email_inp == "" || phonenumber_inp == "")

    {
        
        admin_profile_error_field.style.display = "block";
        admin_profile_error_field.innerHTML = "لطفا تمام ورودی ها را پر کنید";
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;
        
    }

}