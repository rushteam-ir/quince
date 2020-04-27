module.exports = class {

    constructor(inputs) {

        this.inputs = inputs;

    }

    valid() {

        let validation_result = null;
        let abort = false;

        for(let i = 0; i < this.inputs.length && !abort;  i++){

            let input = this.inputs[i];

            if(input.value == ''){

                validation_result = 'empty-input';
                abort = true;

            }
            else if(Array.isArray(input.value) || input.value.constructor === ({}).constructor){

                validation_result = 'invalid-input';
                abort = true;

            }

            if(input.type && !abort){

                switch(input.type){

                    case 'username':
                    {

                        if(input.value.length < 4) {

                            validation_result = 'short-input';
                            abort = true;

                        }

                        break;

                    }

                    case 'password':
                    {

                        if(input.value.length < 8) {

                            validation_result = 'short-input';
                            abort = true;

                        }

                        break;

                    }

                    case 'email':
                    {

                        let email_regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                        if(!email_regexp.test(input.value)){

                            validation_result = 'invalid-email';
                            abort = true;

                        }

                        break;

                    }

                    case 'phone':
                    {

                        if(number_inp.length != 11){

                            validation_result = 'not-phonenumber';
                            abort = true;

                        }

                        break;

                    }

                    case 'number':
                    {

                        if(isNaN(parseInt(input.value))){

                            validation_result = 'not-number';
                            abort = true;

                        }

                        break;

                    }

                }

            }

        }

        return validation_result;

    }

}