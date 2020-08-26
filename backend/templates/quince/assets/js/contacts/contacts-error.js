let err = new errorHandler();

function contactsError() {

    let reply_text_inp = $('input[name=reply_text_inp]').val();
    let validation_result = null;

    switch(sessionStorage.modal){

        case '1':
        {

            validation_result = err.initiate([

                { value : reply_text_inp, type : 'empty'},

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