let err = new errorHandler();

function profileError() {

    let first_name_inp = $('input[name=first_name_inp]').val();
    let last_name_inp = $('input[name=last_name_inp]').val();
    let nick_name_inp = $('input[name=nick_name_inp]').val();
    let email_inp = $('input[name=email_inp]').val();
    let phone_number_inp = $('input[name=phone_number_inp]').val();
    // let day_inp = $('input[name=day_inp]').val();
    // let year_inp = $('input[name=year_inp]').val();
    // let country_inp = $('input[name=country_inp]').val();
    // let city_inp = $('input[name=city_inp]').val();
    // let bio_inp = $('input[name=bio_inp]').val();
    // let city_inp = $('input[name=city_inp]').val();

    let validation_result = err.initiate([
        { value : first_name_inp, type : 'empty'},
        { value : last_name_inp, type : 'empty'},
        { value : nick_name_inp, type : 'empty'},
        { value : email_inp, type : 'email'},
        { value : email_inp, type : 'empty'},
        { value : phone_number_inp, type : 'empty'},
        { value : phone_number_inp, type : 'phone number'},
    ])


    if(validation_result){

        error();
        $('.error_info p').text(validation_result);
        return false;

    } else{

        return true;

    }
    



}