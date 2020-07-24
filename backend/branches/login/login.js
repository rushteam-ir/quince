const router = express.Router();

router.get('/', async(req, res, next)=>{

    try {

        let data = {

            login_form: req.session.login_form,

        }

        res.render('login/login', data);

    }
    catch (error) {

        next(error);

    }

});

router.post('/', async(req, res, next)=>{

    try{

        let {email_inp, password_inp, captcha_inp} = req.body;
        let login_form = {email_inp, password_inp, captcha_inp};

        req.session.login_form = login_form;

        let validation_result = new validation([
            {value : email_inp, type : 'email'},
            {value : password_inp, type : 'password'},
            {value : captcha_inp}
        ]).valid()

        //errorManager.set(validation_result);

        if(captcha_inp.toLowerCase() != req.session.captcha){

            //errorManager.set(8);
            return res.redirect(`${config.backend_url}login`);

        }

        let result = await admin_model.login(email_inp, password_inp);

        if(result){

            if(result.status){

                delete req.session.login_form;
                delete req.session.captcha;

                req.session.admin_id = result._id;
                req.session.admin_info = result;

                return res.redirect(`${config.backend_url}dashboard`);

            }
            else{

                //errorManager.set(9);
                return res.redirect(`${config.backend_url}login`);

            }

        }
        else{

            //errorManager.set(11);
            return res.redirect(`${config.backend_url}login`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;