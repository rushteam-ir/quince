const router = express.Router();

router.post('/', async(req,res)=>{

    try{

        let {email_inp, password_inp} = req.body;
        let login_form = {email_inp, password_inp};

        let valid_email = validation.isEmail(email_inp);
        let valid_password = validation.isPassword(password_inp);

        if(valid_email != ''){

            res.redirect(`${config.frontend_url}`);

        }
        else if(valid_password != ''){

            res.redirect(`${config.frontend_url}`);

        }
        else{

            let result = await user_model.login(email_inp, password_inp);

            if(result){

                if(result.access == "normal_user"){

                    if(result.status){

                        req.session.user_id = result._id;
                        req.session.user_info = result;

                        res.redirect(`${config.frontend_url}`);

                    }
                    else{

                        res.redirect(`${config.frontend_url}?msg=inactive-user`);

                    }

                }
                else{

                    res.redirect(`${config.frontend_url}?msg=incorrect-input`);

                }

            }
            else{

                res.redirect(`${config.frontend_url}user/login/?msg=incorrect-input`);

            }

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;