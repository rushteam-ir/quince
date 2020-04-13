const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        if(req.session.login_form){

            let login_form = req.session.login_form;
            res.render('login',{login_form})

        }
        else{

            res.render('login');

        }

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

        let valid_email = validation.isEmail(email_inp);
        let valid_password = validation.isPassword(password_inp);
        let valid_captcha = validation.isCaptcha(captcha_inp);

        if(valid_email != ''){

            res.redirect(`${config.backend_url}login`);

        }
        else if(valid_password != ''){

            res.redirect(`${config.backend_url}login`);

        }
        else if(valid_captcha != ''){

            res.redirect(`${config.backend_url}login`);

        }
        else if(captcha_inp.toLowerCase()!= req.session.captcha){

            res.redirect(`${config.backend_url}login/?msg=captcha-error`);

        }
        else{

            let result = await user_model.login(email_inp, password_inp);

            if(result){

                if(result.access == "main_admin" || result.access == "normal_admin"){

                    if(result.status){

                        delete req.session.login_form;
                        delete req.session.captcha;

                        req.session.admin_id = result._id;
                        req.session.admin_info = result;

                        res.redirect(`${config.backend_url}dashboard`);

                    }
                    else{

                        res.redirect(`${config.backend_url}login/?msg=inactive-admin`);

                    }

                }
                else{

                    res.redirect(`${config.backend_url}login/?msg=incorrect-input`);

                }

            }
            else{

                res.redirect(`${config.backend_url}login/?msg=incorrect-input`);

            }

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;