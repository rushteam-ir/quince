const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        if(req.query.code){

            if(req.session.saved_code === req.query.code){

                res.render('recovery/recovery-verify');

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

router.post('/', async(req,res)=>{

    try{

        let {newpass_inp, compass_inp} = req.body;

        let validation_result = new validation([
            {value : newpass_inp, type : 'password'},
            {value : compass_inp, type : 'password'}
        ]).valid();

        if(validation_result){

            return res.redirect(`${config.backend_url}recovery/verify/?code=${req.session.saved_code}&msg=${validation_result}`);

        }

        let admin_data = {password : newpass_inp};

        let result = await user_model.changePassword(req.session.saved_email, admin_data)

        if(result){

            delete req.session.saved_email;
            delete req.session.saved_code;

            return res.redirect(`${config.backend_url}login/?msg=change-success`);

        }
        else{

            return res.redirect(`${config.backend_url}recovery/verify/?code=${req.session.saved_code}&msg=change-fail`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;