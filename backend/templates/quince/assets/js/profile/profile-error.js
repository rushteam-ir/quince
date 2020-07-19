let err = new errorHandler();

function profileError() {

    let first_name_inp = $('input[name=first_name_inp]').val();
    let last_name_inp = $('input[name=last_name_inp]').val();
    let nick_name_inp = $('input[name=nick_name_inp]').val();
    let email_inp = $('input[name=email_inp]').val();
    let phone_number_inp = $('input[name=phone_number_inp]').val();
    let day_inp = $('input[name=day_inp]').val();
    let month_inp = $('input[name=month_inp]').val();
    let year_inp = $('input[name=year_inp]').val();
    let country_inp = $('input[name=country_inp]').val();
    let city_inp = $('input[name=city_inp]').val();
    let current_password = $('input[name=current_password]').val();
    let new_password = $('input[name=new_password]').val();
    let confirm_password = $('input[name=confirm_password]').val();

    let validation_result = null;

    switch(sessionStorage.profileTab){

        case '1':
        {

            validation_result = err.initiate([

                { value : first_name_inp, type : 'empty'},
                { value : last_name_inp, type : 'empty'},
                { value : nick_name_inp, type : 'empty'},
                { value : email_inp, type : 'email'},
                { value : email_inp, type : 'empty'},
                { value : phone_number_inp, type : 'empty'},
                { value : phone_number_inp, type : 'phone number'},
        
            ]);
            break;
        
        }
        case '2':
        {

            validation_result = err.initiate([
        
                { value : day_inp, type : 'empty'},
                { value : day_inp, type : 'born date'},
                { value : month_inp, type : 'empty'},
                { value : month_inp, type : 'born date'},
                { value : year_inp, type : 'empty'},
                { value : year_inp, type : 'born date'},
                { value : country_inp, type : 'empty'},
                { value : city_inp, type : 'empty'},
        
            ]);
            break;
        
        }
        case '3':
        {

            validation_result = err.initiate([
        
                { value : current_password, type : 'empty'},
                { value : new_password, type : 'empty'},
                { value : confirm_password, type : 'empty'},
        
            ]);
            
            break;
        
        }

    }



    if(validation_result){

        error();
        $('.error_info p').text(validation_result);
        return false;

    }else if(new_password !== confirm_password){

        error();
        $('.error_info p').text('رمز عبور جدید و تکرار آن مشابه نیستند.');
        return false;

    }else{

        return true;

    }
    
}