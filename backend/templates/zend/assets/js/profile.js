// var new_password = document.forms['admin_pro_pass_edit']['new_password'].value;
// var confirm_password = document.forms['admin_pro_pass_edit']['confirm_password'].value;

// var password_error = document.getElementById('admin_profile_password_error');

// function passError(){
//   if( new_password == confirm_password ){
//     password_error.style.display = "block";
//     password_error.innerHTML = "رمز عبور با تکرار رمز عبور یکسان نمی باشد";
//     alert(new_password)
//     return false;
//   }
// }

var first_pro_box = document.getElementById('first_pro_box');
var second_pro_box = document.getElementById('second_pro_box');

var admin_pro_edit = document.getElementById('admin_pro_edit');
var admin_change_pass = document.getElementById('admin_change_pass');

function secondChangeDisplay(){
    admin_change_pass.style.display = "block";
    admin_pro_edit.style.display = "none";
    second_pro_box.style.backgroundColor = "white";
    first_pro_box.style.backgroundColor = "#F7F8FB";
}

function firstChangeDisplay(){
    admin_pro_edit.style.display = "block"
    admin_change_pass.style.display = "none";
    second_pro_box.style.backgroundColor = "#F7F8FB";
    first_pro_box.style.backgroundColor = "white";
}
 







