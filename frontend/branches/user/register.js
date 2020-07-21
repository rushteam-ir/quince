const router = express.Router();

router.post('/', async(req, res)=>{


    try{

        let {email_inp, phone_number_inp, password_inp, password_confirm_inp} = req.body;

        let valid_email = validation.isEmail(email_inp);
        let valid_phone_number = validation.isPhonenumber(phone_number_inp);
        let valid_password = validation.isPassword(password_inp);
        let valid_password_confirm = validation.isPassword(password_confirm_inp);

        if(valid_email != ''){
            res.redirect(`${config.frontend_url}`);
        }
        else if(valid_phone_number != ''){
            res.redirect(`${config.frontend_url}`);
        }
        else if(valid_password != ''){
            res.redirect(`${config.frontend_url}`);
        }
        else if(valid_password_confirm != ''){
            res.redirect(`${config.frontend_url}`);
        }
        else{

            if(password_inp == password_confirm_inp){

                let new_user = {

                    email : email_inp,
                    phone_number : phone_number_inp,
                    password : password_inp,
                    status : true,
                    access : "normal_user"

                }

                let result = await admin_model.register(new_user);

                if(result){

                    res.redirect(`${config.frontend_url}?msg=register-success`);

                }
                else{

                    res.redirect(`${config.frontend_url}?msg=register-fail`);

                }

            }
            else{

                res.redirect(`${config.frontend_url}`);

            }

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;