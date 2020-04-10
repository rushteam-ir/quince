const router = express.Router();

router.get('/:id', async(req,res)=>{

    try{

        let message_id = req.params.id

        if(!isObjectId(message_id)){
            return res.redirect(`${config.backend_url}messages`);
        }

        let data = {

            info : await message_model.getById(message_id)

        }

        res.render('messages/messages-reply', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/:id', async(req,res)=>{

    try{

        let message_id = req.params.id

        if(isObjectId(message_id)){

            let message_info = await message_model.getById(message_id);
            let {title_inp, text_inp} = req.body;
            let title_valid = validation.isSafe(title_inp);
            let text_valid = validation.isSafe(text_inp);

            if(title_valid != ''){

                res.redirect(`${config.backend_url}messages/reply/${message_id}`);

            }
            else if(text_valid){

                res.redirect(`${config.backend_url}messages/reply/${message_id}`);

            }
            else{

                let mail_options = {

                    from: 'zendcms@zohomail.com',
                    to: message_info.email,
                    subject: title_inp,
                    text: text_inp

                };

                transporter.sendMail(mail_options, function(error, info){

                    if (error) {

                        res.redirect(`${config.backend_url}messages/reply/${message_id}/?msg=sent-fail`);

                    } else {

                        res.redirect(`${config.backend_url}messages/?msg=sent-success`);

                    }

                });

            }

        }
        else{

            return res.redirect(`${config.backend_url}messages`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;