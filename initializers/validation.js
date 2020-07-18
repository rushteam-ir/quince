module.exports = validation =  class {

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
        else if(input.type != 'array' && (Array.isArray(input.value))){

            return 'invalid-input';

        }

        if(input.type){

            switch(input.type){

                case 'username':
                {

                    if(input.value.length < 4) {

                        return 0;

                    }

                    break;

                }

                case 'password':
                {

                    if(input.value.length < 8) {

                        return 0;

                    }

                    break;

                }

                case 'email':
                {

                    let email_regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                    if(!email_regexp.test(input.value)){

                        return 1;

                    }

                    break;

                }

                case 'phone':
                {

                    if(input.value.length != 11){

                        return 2;

                    }

                    break;

                }

                case 'number':
                {

                    if(isNaN(parseInt(input.value))){

                        return 3;

                    }

                    break;

                }

                case 'objectId':
                {

                    if(!mongoose.Types.ObjectId.isValid(input.value)){

                        return 4;

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

                        return 5;

                    }

                    break;

                }

                case 'date':
                {

                    let date = input.value.split('/');
                    let day = parseInt(date[2]);
                    let month = parseInt(date[1]);
                    let year = parseInt(date[0]);

                    if(day < 0 || day > 31){
                        return 6
                    }
                    else if(month < 0 || month > 12){
                        return 6
                    }
                    else if(year < 1300){
                        return 6
                    }

                    break;

                }

                case 'date-exp':
                {

                    let date = input.value.split('/');
                    let day = parseInt(date[2]);
                    let month = parseInt(date[1]);
                    let year = parseInt(date[0]);

                    if(day < 0 || day > 31){
                        return 7
                    }
                    else if(month < 0 || month > 12){
                        return 7
                    }
                    else if(year < 1300){
                        return 7
                    }

                    let exp_date = JalaliConvert([year, month, day]);
                    let curr_date = JalaliConvert(getCurrentDate().split('/'));
                    let time_difference = exp_date.getTime() - curr_date.getTime();

                    if(time_difference < 0){
                        return 7;
                    }

                    break;

                }

            }

        }

        return null;

    }

}