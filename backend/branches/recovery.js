const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('recovery');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        let {email_inp} = req.body;
        let valid_email = validation.isEmail(email_inp);

        if(valid_email != ''){

            res.redirect(`${config.backend_url}recovery/?msg=${valid_email}`);

        }
        else{

            await admin_model.recoveryEmail(email_inp, (result)=>{

                if(result){

                    let verify_code = randomString(10);

                    let mail_options = {

                        from: 'zendcms@zohomail.com',
                        to: email_inp,
                        subject: 'بازیابی حساب کاربری',
                        text: `${config.backend_url}recovery/verify/?code=${verify_code}`

                    };

                    transporter.sendMail(mail_options, function(error, info){

                        if (error) {

                            res.redirect(`${config.backend_url}recovery/?msg=sent-fail`);

                        } else {

                            req.session.saved_email = email_inp;
                            req.session.saved_code = verify_code;

                            res.redirect(`${config.backend_url}login/?msg=sent-success`);

                        }

                    });

                }
                else{

                    res.redirect(`${config.backend_url}recovery/?msg=invalid-email`);

                }

            });

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.get('/verify', async(req,res)=>{

    try{

        if(req.query.code){

            if(req.session.saved_code === req.query.code){

                res.render('recovery-verify');

            }
            else{

                res.status(404).render('404');

            }

        }
        else{

            res.status(404).render('404');

        }


    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/verify', async(req,res)=>{

    try{

        let {newpass_inp, compass_inp} = req.body;

        let valid_newpass = validation.isPassword(newpass_inp);
        let valid_compass = validation.isPassword(compass_inp);

        if(valid_newpass != ''){

            res.redirect(`${config.backend_url}recovery/verify/?code=${req.session.saved_code}&msg=${valid_newpass}`);

        }
        else if(valid_compass != ''){

            res.redirect(`${config.backend_url}recovery/verify/?code=${req.session.saved_code}&msg=${valid_compass}`);

        }
        else if(newpass_inp !== compass_inp){

            res.redirect(`${config.backend_url}recovery/verify/?code=${req.session.saved_code}&msg=not-match`);

        }
        else{

            let admin_data = {password : newpass_inp};

            admin_model.changePassword(req.session.saved_email, admin_data, (result)=>{

                if(result){

                    delete req.session.saved_email;
                    delete req.session.saved_code;

                    res.redirect(`${config.backend_url}login/?msg=change-success`);

                }else{

                    res.redirect(`${config.backend_url}recovery/verify/?code=${req.session.saved_code}&msg=change-fail`);

                }

            });

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;