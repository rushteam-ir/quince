const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let data = {

            msg : req.session.msg

        }

        res.render('recovery/recovery-verify', data);
        req.session.msg = '';

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        let {new_password_inp} = req.body;

        let validation_result = new validation([
            {value : new_password_inp}
        ]).valid();

        if(validation_result){

            if(req.session.msg == ''){
                req.session.msg = validation_result;
            }

        }

        let result_verify = await user_model.verifyPendingPassword(req.session.saved_email, new_password_inp, {
            pending_password : randomString(6),
            password : new_password_inp
        })

        if(result_verify){

            let result = await user_model.login(req.session.saved_email, new_password_inp);

            if(result){

                if(result.access == "main_admin" || result.access == "normal_admin"){

                    if(result.status){

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

        }
        else{

            if(req.session.msg == ''){
                req.session.msg = "رمز عبور وارد شده صحیح نمی باشد.";
            }

            return res.redirect(`${config.backend_url}recovery/verify`);

        }



    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;