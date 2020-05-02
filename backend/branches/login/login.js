const router = express.Router();

router.get('/', async(req,res)=>{

    try {

        let data = {

            login_form: req.session.login_form,
            msg : req.session.msg

        }

        res.render('login/login', data);
        req.session.msg = '';

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        let {email_inp, password_inp, captcha_inp} = req.body;
        let login_form = {email_inp, password_inp, captcha_inp};

        req.session.login_form = login_form;

        let validation_result = new validation([
            {value : email_inp, type : 'email'},
            {value : password_inp, type : 'password'},
            {value : captcha_inp}
        ]).valid()

        if(validation_result){

            if(req.session.msg == ''){
                req.session.msg = validation_result;
            }

        }
        else if(captcha_inp.toLowerCase()!= req.session.captcha){

            if(req.session.msg == ''){
                req.session.msg = 'کد امنیتی صحیح نمی باشد.';
            }

        }

        let result = await user_model.login(email_inp, password_inp);

        if(result){

            if(result.access == "main_admin" || result.access == "normal_admin"){

                if(result.status){

                    delete req.session.login_form;
                    delete req.session.captcha;

                    req.session.admin_id = result._id;
                    req.session.admin_info = result;

                    return res.redirect(`${config.backend_url}dashboard`);

                }
                else{

                    if(req.session.msg == ''){
                        req.session.msg = 'حساب شما مسدود می باشد.';
                    }

                }

            }
            else{

                if(req.session.msg == ''){
                    req.session.msg = 'ایمیل و یا رمز عبور اشتباه می باشد.';
                }

            }

        }
        else{

            if(req.session.msg == ''){
                req.session.msg = 'ایمیل و یا رمز عبور اشتباه می باشد.';
            }

        }

        res.redirect(`${config.backend_url}login`);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;