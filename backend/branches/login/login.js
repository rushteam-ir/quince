const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        if(req.session.login_form){

            let login_form = req.session.login_form;
            res.render('login/login',{login_form})

        }
        else{

            res.render('login/login');

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

        let validation_result = new validation([
            {value : email_inp, type : 'email'},
            {value : password_inp, type : 'password'},
            {value : captcha_inp}
        ]).valid()

        if(validation_result){

            return res.redirect(`${config.backend_url}login/?msg=${validation_result}`);

        }
        else if(captcha_inp.toLowerCase()!= req.session.captcha){

            return res.redirect(`${config.backend_url}login/?msg=captcha-error`);

        }

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

                    return res.redirect(`${config.backend_url}login/?msg=inactive-admin`);

                }

            }
            else{

                return res.redirect(`${config.backend_url}login/?msg=incorrect-input`);

            }

        }
        else{

            return res.redirect(`${config.backend_url}login/?msg=incorrect-input`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;