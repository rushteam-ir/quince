let err = new errorHandler();

function categoryError() {

    let title_inp = $('input[name=title_inp]').val();
    let edit_title_inp = $('input[name=edit_title_inp]').val();


    let validation_result = null;

    console.log(sessionStorage.categoryModal)

    switch(sessionStorage.categoryModal){

        case '0':
        {

            validation_result = err.initiate([

                { value : title_inp, type : 'empty'},

            ]);
            break;
        
        }

        case '1':
        {

            validation_result = err.initiate([

                { value : edit_title_inp, type : 'empty'},

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