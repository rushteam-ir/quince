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

        if(input.value == '' || isUndefined(input.value)){

            return 'لطفا تمام ورودی ها را وارد کنید.';

        }
        else if(input.type != 'array' && (Array.isArray(input.value))){

            return 'ورودی وارد شده معتبر نمی باشد';

        }

        if(input.type){

            switch(input.type){

                case 'username':
                {

                    if(input.value.length < 4) {

                        return 'نام کاربری باید بیشتر از 4 حرف باشد.';

                    }

                    break;

                }

                case 'password':
                {

                    if(input.value.length < 8) {

                        return 'رمز عبور باید بیشتر از 8 حرف باشد.';

                    }

                    break;

                }

                case 'email':
                {

                    let email_regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

                    if(!email_regexp.test(input.value)){

                        return 'ایمیل وارد شده معتبر نمی باشد.';

                    }

                    break;

                }

                case 'phone':
                {

                    if(input.value.length != 11){

                        return 'شماره تلفن همراه معتبر نمی باشد.';

                    }

                    break;

                }

                case 'number':
                {

                    if(isNaN(parseInt(input.value))){

                        return 'ورودی وارد شده باید به صورت عدد باشد.';

                    }

                    break;

                }

                case 'objectId':
                {

                    if(!mongoose.Types.ObjectId.isValid(input.value) && input.value != 0){

                        return 'ورودی وارد شده معتبر نمی باشد.';

                    }

                    break;

                }

                case 'array':
                {
                    if(!Array.isArray(input.value)){

                        let last_value = input.value;
                        input.value = [last_value];

                    }

                    for(let index of input.value){

                        if(index.length == 0){

                            return 'لطفا تمام ورودی ها را وارد کنید.';

                        }

                    }

                    break;

                }

                case 'date':
                {

                    let date = input.value.split('/');
                    let day = parseInt(date[2]);
                    let month = parseInt(date[1]);
                    let year = parseInt(date[0]);

                    if(isNaN(day) || isNaN(month) || isNaN(year)){

                        return 'تاریخ وارد شده معتبر نمی باشد.'

                    }

                    if(day < 0 || day > 31){
                        return 'تاریخ وارد شده معتبر نمی باشد.'
                    }
                    else if(month < 0 || month > 12){
                        return 'تاریخ وارد شده معتبر نمی باشد.'
                    }
                    else if(year < 1300){
                        return 'تاریخ وارد شده معتبر نمی باشد.'
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
                        return 'تاریخ وارد شده معتبر نمی باشد و یا گذشته است.'
                    }
                    else if(month < 0 || month > 12){
                        return 'تاریخ وارد شده معتبر نمی باشد و یا گذشته است.'
                    }
                    else if(year < 1300){
                        return 'تاریخ وارد شده معتبر نمی باشد و یا گذشته است.'
                    }

                    let exp_date = JalaliConvert([year, month, day]);
                    let curr_date = JalaliConvert(getCurrentDate().split('/'));
                    let time_difference = exp_date.getTime() - curr_date.getTime();

                    if(time_difference < 0){
                        return 'تاریخ وارد شده معتبر نمی باشد و یا گذشته است.';
                    }

                    break;

                }

            }

        }

        return null;

    }

}