// remove back errors

function removeSuccessError(){

    document.getElementById('error_field_success').style.display = "none";
    
}

function removeDangerError(){

    document.getElementById('error_field_danger').style.display = "none";
    
}

function removeWarningError(){

    document.getElementById('error_field_warning').style.display = "none";
    
}


// remove front errors

function removeSuccessErrorFront(){

    document.getElementById('error_field_success_front').style.display = "none";
    
}

function removeDangerErrorFront(){

    document.getElementById('error_field_danger_front').style.display = "none";
    
}

function removeWarningErrorFront(){

    document.getElementById('error_field_warning_front').style.display = "none";
    
}

function scrollTop(){

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

}