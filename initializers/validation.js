module.exports = class {

    constructor(inputs) {

        this.inputs = inputs;

    }

    valid() {

        let validation_result = null;

        for(let i = 0; i < this.inputs.length;  i++){

            let input = this.inputs[i];
            validation_result = this.checkValidation(input);

            if(validation_result){

                break;

            }

        }

        return validation_result;

    }

    checkValidation(input){

        if(input.value == ''){

            return 'empty-input';

        }
        else if(input.type != 'array' && (Array.isArray(input.value) || input.value.constructor === ({}).constructor)){

            return 'invalid-input';

        }

        if(input.type){

            switch(input.type){

                case 'username':
                {

                    if(input.value.length < 4) {

                        return 'short-input';

                    }

                    break;

                }

                case 'password':
                {

                    if(input.value.length < 8) {

                        return 'short-input';

                    }

                    break;

                }

                case 'email':
                {

                    let email_regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                    if(!email_regexp.test(input.value)){

                        return 'invalid-email';

                    }

                    break;

                }

                case 'phone':
                {

                    if(input.value.length != 11){

                        return 'not-phonenumber';

                    }

                    break;

                }

                case 'number':
                {

                    if(isNaN(parseInt(input.value))){

                        return 'not-number';

                    }

                    break;

                }

                case 'objectId':
                {

                    if(!mongoose.Types.ObjectId.isValid(input.value)){

                        return 'invalid-id';

                    }

                    break;

                }

                case 'array':
                {

                    if(!Array.isArray(input.value)){

                        input.value = [''];

                    }

                    for(let i = 0; i < input.value.length; i++){

                        if(input.value[i] == ''){

                            input.value.splice(i , 1);

                        }

                    }

                    if(input.value.length == 0){

                        return 'empty-input'

                    }

                    break;

                }

            }

        }

        return null;

    }

}