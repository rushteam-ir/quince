function discountError(){

    $('.alert_query').remove();

    var value_inp = document.forms['discount_form']['value_inp'].value;
    var error_field = document.getElementById('error_field_warning_front');
    var error_text = document.getElementById('error_text')

    if(value_inp == ""){

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا میزان تخفیف را وارد کنید .";
        return false;

    }

    else if(value_inp >100){

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        error_field.style.display = "block";
        error_text.innerHTML = "لطفا عدد تخفیف را وارد کنید.";
        return false;

    }

}