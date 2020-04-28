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

            let validation_result = new validation([
                {value : title_inp},
                {value : text_inp}
            ]).valid();

            if(validation_result){

                return res.redirect(`${config.backend_url}messages/reply/${message_id}/?msg=${validation_result}`);

            }

            let mail_options = {

                from: 'zendcms@zohomail.com',
                to: message_info.email,
                subject: title_inp,
                text: text_inp

            };

            transporter.sendMail(mail_options, async function(error, info){

                if (error) {

                    return res.redirect(`${config.backend_url}messages/reply/${message_id}/?msg=sent-fail`);

                } else {

                    let message_data = {

                        reply : true

                    }

                    let result = await message_model.edit(message_id, message_data);

                    if(result){

                        return res.redirect(`${config.backend_url}messages/?msg=sent-success`);

                    }
                    else{

                        return res.redirect(`${config.backend_url}messages/reply/${message_id}/?msg=sent-fail`);

                    }

                }

            });

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