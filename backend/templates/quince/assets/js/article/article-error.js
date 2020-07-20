let err = new errorHandler();

function articleError() {

    let title_inp = $('input[name=title_inp]').val();
    let describe_inp = $('textarea[name=describe_inp]').val();
    let meta_describe_inp = $('textarea[name=meta_describe_inp]').val();
    let main_image = $('input[name=main_image]').val();

    let validation_result = null;

    validation_result = err.initiate([

        { value : title_inp, type : 'empty'},
        { value : describe_inp, type : 'empty'},
        { value : meta_describe_inp, type : 'empty'},
        { value : main_image, type : 'empty'},

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