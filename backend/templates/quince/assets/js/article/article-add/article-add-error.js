let err = new errorHandler();

function articleAddError() {

    let title_inp = $('input[name=title_inp]').val();

    let validation_result = null;

    validation_result = err.initiate([

        { value : title_inp, type : 'empty'},

    ]);

    if(validation_result){

        error();
        $('.error_info p').text(validation_result);
        return false;

    }
    else{

        return true;

    }
    
}