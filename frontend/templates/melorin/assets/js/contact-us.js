// collapse js
var toggle_box = document.getElementsByClassName('header_and_angle_field');
var i;

for (i = 0; i < toggle_box.length; i++) {

    toggle_box[i].addEventListener("click", function () {

        var panel = this.nextElementSibling;
        
        if (panel.style.display === "block") {

            panel.style.display = "none";

        } else {

            panel.style.display = "block";
            
        }
    });
}

// error js

function contactError(){

    var firstlastname_inp = document.forms['contactus_form']['firstlastname_inp'].value;
    var email_inp = document.forms['contactus_form']['email_inp'].value;
    var phonenumber_inp = document.forms['contactus_form']['phonenumber_inp'].value;
    var text_inp = document.forms['contactus_form']['text_inp'].value;
    var title_inp = document.forms['contactus_form']['title_inp'].value;

    

    var error_field = document.getElementById('error_field');
    error_field.style.display = "block";

    document.body.scrollTop = 700;
    document.documentElement.scrollTop = 700;

    if(firstlastname_inp == ""){

        error_field.innerHTML = "لطفا نام و نام خانوادگی خود را وارد کنید.";
        return false;

    }

    else if(email_inp == ""){

        error_field.innerHTML = "لطفا ایمیل خود را وارد کنید ."
        return false;

    }

    else if(!email_inp.includes("@") || !email_inp.includes(".com") || email_inp.length <= 6){

        error_field.innerHTML = "ایمیل وارد شده صحیح نمی باشد."
        return false;
    
    }

    else if(phonenumber_inp == ""){

        error_field.innerHTML = "لطفا شماره تلفن خود را وارد کنید."
        return false;

    }

    else if (isNaN(phonenumber_inp)){

        error_field.innerHTML = "شماره تلفن وارد شده صحیح نمی باشد"
        return false;

    }

    else if(phonenumber_inp.length <= 10){

        error_field.innerHTML = "شماره تلفن وارد شده کم تر از حد مجاز است."
        return false;

    }

    else if(phonenumber_inp.length >= 12){

        error_field.innerHTML = "شماره تلفن وارد شده بیشتر تر از حد مجاز است."
        return false;

    }

    else if(title_inp == ""){

        error_field.innerHTML = "لطفا متن عنوان را وارد کنید."
        return false;

    }

    else if(text_inp == ""){

        error_field.innerHTML = "لطفا متن پیام خود را وارد کنید."
        return false;
        
    }

}