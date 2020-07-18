class errorHandler {

    initiate(inputs){

        let validation_result = null;

        for(let i = 0; i < inputs.length; i++){

            let input = inputs[i];

            validation_result = this.checkValidation(input);

            if(validation_result){

                break;

            }

        }

        return validation_result;

    }

    checkValidation(input){

        let value = input.value;
        let type = input.type;

        switch(type){

            case 'empty':
            {

                if(value == ''){

                    return 'لطفا تمام ورودی ها را وارد کنید.';

                }

                break;

            }
            case 'email':
            {

                let email_regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                if(!email_regexp.test(value)){

                    return 'ایمیل وارد شده معتبر نمی باشد.';

                }

                break;

            }
            case 'phone number':
            {

                if(isNaN(value) || value.length != 11){

                    return 'شماره تماس وارد شده نامعتبر است.';

                }

                break;

            }

        }

    }

}

