const router = express.Router();

router.get('/', async(req,res)=>{

    try {

        let data = {

            login_form: req.session.login_form,

        }

        res.render('login/login', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        let {email_inp, password_inp, captcha_inp} = req.body;
        let login_form = {email_inp, password_inp, captcha_inp};
        let msg = '';

        req.session.login_form = login_form;

        let validation_result = new validation([
            {value : email_inp, type : 'email'},
            {value : password_inp, type : 'password'},
            {value : captcha_inp}
        ]).valid()

        if(validation_result){

            msg = validation_result;

        }
        else if(captcha_inp.toLowerCase()!= req.session.captcha){

            msg = 'captcha-error';

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

                    msg = 'inactive-admin';

                }

            }
            else{

                msg = 'incorrect-input';

            }

        }
        else{

            msg = 'incorrect-input';

        }

        let data = {

            msg : msg,

        }

        res.render('login/login', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;