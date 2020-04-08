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

        let {username_inp, password_inp, captcha_inp} = req.body;
        let login_form = {username_inp, password_inp, captcha_inp};

        req.session.login_form = login_form;

        let valid_username = validation.isUsername(username_inp);
        let valid_password = validation.isPassword(password_inp);
        let valid_captcha = validation.isCaptcha(captcha_inp);

        if(valid_username != ''){

            // Not valid username
            res.redirect(`${config.backend_url}login/?msg=${valid_username}`);

        }
        else if(valid_password != ''){

            // Not valid password
            res.redirect(`${config.backend_url}login/?msg=${valid_password}`);

        }
        else if(valid_captcha != ''){

            // Not valid captcha
            res.redirect(`${config.backend_url}login/?msg=${valid_captcha}`);

        }
        else if(captcha_inp.toLowerCase()!= req.session.captcha){

            // Captcha Error
            res.redirect(`${config.backend_url}login/?msg=captcha-error`);

        }
        else{

            await user_model.login(username_inp, password_inp, (result, find_user)=>{

                if(result){

                    if(find_user.status && (find_user.access == "main_admin" || find_user.access == "normal_admin")){

                        // Login was successful
                        delete req.session.login_form;
                        delete req.session.captcha;

                        req.session.admin_id = find_user._id;
                        req.session.admin_info = find_user;

                        res.redirect(`${config.backend_url}dashboard`);

                    }
                    else {

                        // User is banned
                        res.redirect(`${config.backend_url}login/?msg=inactive-admin`);

                    }

                }
                else{

                    // Username or password is incorrect
                    res.redirect(`${config.backend_url}login/?msg=incorrect-input`);

                }

            })

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;