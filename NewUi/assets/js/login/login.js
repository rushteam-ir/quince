var recovery_page = document.getElementById('recovery_page');

var log_field = document.querySelector('.main_filed_of_login');
var log_form = document.querySelector('.log_form');
var recovery_form = document.querySelector('.recovery_form');

var back_btn_log = document.querySelector('.back_btn_log');

// if(sessionStorage.recovery == 1){
    
//     recovery_form.style.display = "block";
//     log_form.style.display = "none";
//     recovery_form.style.opacity = "1";

// }

recovery_page.addEventListener('click', function () {

    sessionStorage.recovery = 1;

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

back_btn_log.addEventListener('click',function(){

    sessionStorage.recovery = 2;

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