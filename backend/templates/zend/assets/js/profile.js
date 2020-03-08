var first_pro_box = document.getElementById('first_pro_box');
var second_pro_box = document.getElementById('second_pro_box');

var admin_pro_edit = document.getElementById('admin_pro_edit');
var admin_change_pass = document.getElementById('admin_change_pass');


function firstChangeDisplay(){

    admin_pro_edit.style.display = "block"
    admin_change_pass.style.display = "none";
    second_pro_box.style.backgroundColor = "#F7F8FB";
    first_pro_box.style.backgroundColor = "white";
}

function secondChangeDisplay(){

    admin_change_pass.style.display = "block";
    admin_pro_edit.style.display = "none";
    second_pro_box.style.backgroundColor = "white";
    first_pro_box.style.backgroundColor = "#F7F8FB";  
}

function passerror(){
    
    var admin_profile_error_field_pass = document.getElementById('admin_profile_error_field_pass');
    var current_password = document.forms['admin_pro_pass_edit']['current_password'].value;
    
    if (current_password == ''){
        admin_profile_error_field_pass.style.display="block";
        admin_profile_error_field_pass.innerHTML = "salam"
        return false;
    }


}



