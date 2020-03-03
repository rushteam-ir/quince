module.exports = async function (req, res) {

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

};