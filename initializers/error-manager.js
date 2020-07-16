class errorManager {

    set(error_code) {

        if(backend.locals.msg == '' && !isNaN(error_code)){

            switch (error_code) {

                case 0:
                {

                    // short input
                    backend.locals.msg = 'مقدار وارد شده از حالت مجاز کوتاه تر می باشد.'
                    break;

                }
                case 1:
                {

                    // Invalid Email
                    backend.locals.msg = 'ایمیل وارد شده معتبر نمی باشد.'
                    break;

                }
                case 2:
                {

                    // Invalid Phone Number
                    backend.locals.msg = 'شماره تلفن همراه وارد شده صحیح نمی باشد.'
                    break;

                }
                case 3:
                {

                    // Invalid Number
                    backend.locals.msg = 'عدد وارد شده معتبر نمی باشد.'
                    break;

                }
                case 4:
                {

                    // Invalid Object Id
                    backend.locals.msg = 'مقدار وارد شده صحیح نمی باشد. ورودی های خود را دوباره بررسی کنید.'
                    break;

                }
                case 5:
                {

                    // Empty Array
                    backend.locals.msg = 'مقدار وارد شده صحیح نمی باشد. ورودی های خود را دوباره بررسی کنید.'
                    break;

                }
                case 6:
                {

                    // Invalid Date
                    backend.locals.msg = 'تاریخ وارد شده صحیح نمی باشد.'
                    break;

                }
                case 7:
                {

                    // Invalid Date with current date
                    backend.locals.msg = 'تاریخ وارد شده معتبر نمی باشد و یا تاریخ گذشته است.'
                    break;

                }
                case 8:
                {

                    // Incorrect Captcha
                    backend.locals.msg = 'کد امنیتی صحیح نمی باشد.'
                    break;

                }
                case 9:
                {

                    // Incorrect Captcha
                    backend.locals.msg = 'حساب شما مسدود می باشد.'
                    break;

                }
                case 10:
                {

                    // Incorrect Captcha
                    backend.locals.msg = 'ایمیل یا رمز عبور اشتباه می باشد.'
                    break;

                }
                case 11:
                {

                    // Incorrect Captcha
                    backend.locals.msg = 'ایمیل یا رمز عبور اشتباه می باشد.'
                    break;

                }

            }

        }

    }
}

module.exports = new errorManager();