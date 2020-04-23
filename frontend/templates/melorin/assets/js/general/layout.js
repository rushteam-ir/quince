// sticky navbar

window.onscroll = function () {

    myFunction()

};

var header = document.getElementById("myHeader");
var sticky = header.offsetTop;

function myFunction() {

    if (window.pageYOffset > sticky) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }
}


// register and login js

let login_form = document.getElementById('login_form');
let register_form = document.getElementById('register_form');
let recovery_form = document.getElementById('recovery_form');

let modal_height = document.getElementById('modal_height');
let reg_log_modal = document.getElementById('reg_log_modal');

let go_register = document.getElementById('go_register');
let go_login = document.getElementById('go_login');
let go_recovery = document.getElementById('go_recovery');
let go_login_recovery = document.getElementById('go_login_recovery');


reg_log_modal.addEventListener('click', function () {

    login_form.style.opacity = "1";
    modal_height.style.height = "510px";
    login_form.style.display = "block";
    register_form.style.display = "none";
    register_form.style.opacity = "0"
    recovery_form.style.display = "none";
    recovery_form.style.opacity = "0";


    if (go_register) {

        go_register.addEventListener('click', function () {

            login_form.style.opacity = "0";

            setTimeout(function () {

                register_form.style.display = "block";
                login_form.style.display = "none";
                modal_height.style.height = "675px";

            }, 400)

            setTimeout(function () {


                register_form.style.opacity = "1";

            }, 500);

        });

    }

    if (go_login) {

        go_login.addEventListener('click', function () {

            register_form.style.opacity = "0";

            setTimeout(function () {

                login_form.style.display = "block";
                register_form.style.display = "none";
                modal_height.style.height = "510px";

            }, 400)

            setTimeout(function () {


                login_form.style.opacity = "1";

            }, 500);

        });

    }

    if (go_recovery) {

        go_recovery.addEventListener('click', function () {

            login_form.style.opacity = "0";

            setTimeout(function () {

                recovery_form.style.display = "block";
                login_form.style.display = "none";
                modal_height.style.height = "365px";

            }, 400)

            setTimeout(function () {


                recovery_form.style.opacity = "1";

            }, 500);

        });

    }
    if(go_login_recovery){

        go_login_recovery.addEventListener('click',function(){

            recovery_form.style.opacity = "0";
        
            setTimeout(function(){
        
                login_form.style.display = "block";
                recovery_form.style.display = "none";
                modal_height.style.height = "510px";
        
            },400)
        
            setTimeout(function(){
        
        
                login_form.style.opacity = "1";
        
            },500);
        
        });

    }

});