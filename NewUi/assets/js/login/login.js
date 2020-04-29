let recovery_page = document.getElementById('recovery_page');
let log_field = document.querySelector('.main_filed_of_login');

let back_btn_log = document.querySelector('.back_btn_log');
let back_to_recovery = document.querySelector('.back_to_recovery');
let go_verify = document.querySelector('.go_verify');

let recovery_form = document.querySelector('.recovery_form');
let log_form = document.querySelector('.log_form');
let recovery_verify_form = document.querySelector('.recovery_verify_form');

if(sessionStorage.recovery == 2){
    
    recovery_form.style.display = "block";
    log_form.style.display = "none";
    recovery_form.style.opacity = "1";
    log_field.style.height = "400px";
    recovery_verify_form.style.display = "none";

}

if(sessionStorage.recovery == 3){

    log_form.style.display = "none";
    recovery_verify_form.style.display = "block";
    recovery_form.style.display = "none";
    recovery_verify_form.style.opacity = "1";
    log_field.style.height = "290px";

}

// go to recovery page

recovery_page.addEventListener('click', function () {

    sessionStorage.recovery = 2;

    log_form.style.opacity = "0";

    setTimeout(function () {

        recovery_form.style.display = "block";
        log_form.style.display = "none";
        log_field.style.height = "400px";

    }, 400);

    setTimeout(function(){

        recovery_form.style.opacity = "1";
        
    }, 500);

});

// back to log

back_btn_log.addEventListener('click',function(){

    sessionStorage.recovery = 1;

    recovery_form.style.opacity = "0";

    setTimeout(function () {

        recovery_form.style.display = "none";
        log_form.style.display = "block";
        log_field.style.height = "450px";

    }, 400);

    setTimeout(function(){

        log_form.style.opacity = "1";
        
    }, 500);

});

// go to verify

go_verify.addEventListener('click',function(){

    sessionStorage.recovery = 3;

    recovery_form.style.opacity = "0";

    setTimeout(function () {

        recovery_form.style.display = "none";
        recovery_verify_form.style.display = "block";
        log_field.style.height = "290px";

    }, 400);

    setTimeout(function(){

        recovery_verify_form.style.opacity = "1";
        
    }, 500);

});

//back to recovery

back_to_recovery.addEventListener('click',function(){

    sessionStorage.recovery = 2;

    recovery_verify_form.style.opacity = "0";

    setTimeout(function () {

        recovery_form.style.display = "block";
        recovery_verify_form.style.display = "none";
        log_field.style.height = "400px";

    }, 400);

    setTimeout(function(){

        recovery_form.style.opacity = "1";
        
    }, 500);

});