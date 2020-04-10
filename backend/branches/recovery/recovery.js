const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('recovery/recovery');

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

            res.redirect(`${config.backend_url}recovery`);

        }
        else{

            await user_model.recoveryEmail(email_inp, (result)=>{

                if(result){

                    let verify_code = randomString(20);

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

const verify = require('./verify');

router.use('/verify', verify);

module.exports = router;