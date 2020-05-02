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

        let validation_result = new validation([
            {value : email_inp, type : 'email'}
        ]).valid();

        if(!validation_result){

            let result = await user_model.recoveryEmail(email_inp);

            if(result){

                let pending_password = randomString(6);

                let mail_options = {

                    from: 'zendcms@zohomail.com',
                    to: email_inp,
                    subject: 'بازیابی حساب کاربری',
                    text: `رمز عبور جدید شما : ${pending_password}`

                };

                transporter.sendMail(mail_options, async function(error, info){

                    if (error) {


                    }
                    else {

                        await user_model.setPendingPassword(email_inp, {
                            pending_password : pending_password
                        });

                    }

                });

            }

        }

        req.session.saved_email = email_inp;

        res.redirect(`${config.backend_url}recovery/verify`);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const verify = require('./verify');

router.use('/verify', verify);

module.exports = router;