let err = new errorHandler();

function commentsError() {

    let reply_text_inp = $('input[name=reply_text_inp]').val();
    let edit_text_inp = $('input[name=edit_text_inp]').val();
    let validation_result = null;

    switch(sessionStorage.modal){

        case '1':
        {

            validation_result = err.initiate([

                { value : reply_text_inp, type : 'empty'},

            ]);
            break;
        
        }

        case '2':
        {

            validation_result = err.initiate([

                { value : edit_text_inp, type : 'empty'},

            ]);
            break;
        
        }
    }

    if(validation_result){

        error();
        $('.error_info p').text(validation_result);
        return false;

    }
    else{

        return true;

    }
    
}