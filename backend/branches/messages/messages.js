const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let result = await message_model.read();
        // Check if we have a new message
        let message_status = await message_model.check();

        if(message_status){

            backend.locals.messages_status = true;

        }
        else{

            backend.locals.messages_status = false;

        }

        let data = {

            list : await message_model.get()

        }

        res.render('messages/messages', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.get('/:id', async(req,res)=>{

    try{

        let message_id = req.params.id
        let data = {

            info : await message_model.getById(message_id)

        }

        res.render('messages/messages-show', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/:id', async(req,res)=>{

    try{

        let message_id = req.params.id
        let message_info = await message_model.getById(message_id);
        let {title_inp, text_inp} = req.body;
        let title_valid = validation.isSafe(title_inp);
        let text_valid = validation.isSafe(text_inp);

        if(title_valid != ''){
            res.redirect(`${config.backend_url}messages/${message_id}/?msg=${title_valid}`);
        }
        else if(text_valid){
            res.redirect(`${config.backend_url}messages/${message_id}/?msg=${text_valid}`);
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

                    res.redirect(`${config.backend_url}messages/${message_id}/?msg=sent-fail`);

                } else {

                    res.redirect(`${config.backend_url}messages/?msg=sent-success`);

                }

            });

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const delete_message = require('./api/delete-message');

router.use('/api/delete-message', delete_message);

module.exports = router;