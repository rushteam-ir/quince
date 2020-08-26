const router = express.Router();

router.post('/', async(req,res)=>{

    try{

        let {reply_text_inp, reply_id_inp} = req.body;
        let back_url = req.header('Referer') || '/';

        let validation_result = new validation([
            {value : reply_text_inp},
            {value : reply_id_inp, type : 'objectId'},
        ]).valid();

        if(validation_result){

            return res.json(validation_result);

        }

        let contact_info = await contact_model.getContact(reply_id_inp);
        let contact_email = contact_info.author == null ? contact_info.email : contact_info.author.email;

        let reply_data = {

            text : reply_text_inp,
            author : req.session.admin_id,

        }

        let mail_options = {

            from: req.session.admin_info.email,
            to: contact_email,
            subject: 'پاسخ پشتیبانی',
            text: reply_text_inp

        };

        let result = await contact_model.reply(reply_id_inp, reply_data);

        if(result){

            return res.json({
                status : 'success',
                msg : 'پاسخ شما با موفقیت ارسال شد.',
                url : `${back_url}`
            })

        }
        else{

            return res.json('درخواست شما با مشکل مواجه شد.')

        }

        // await transporter.sendMail(mail_options, async function(error, info){
        //
        //     if (error) {
        //
        //         return res.json('درخواست شما با مشکل مواجه شد.')
        //
        //     }
        //     else {
        //
        //         let result = await contact_model.reply(reply_id_inp, reply_data);
        //
        //         if(result){
        //
        //             return res.json({
        //                 status : 'success',
        //                 msg : 'پاسخ شما با موفقیت ارسال شد.',
        //                 url : `${back_url}`
        //             })
        //
        //         }
        //         else{
        //
        //             return res.json('درخواست شما با مشکل مواجه شد.')
        //
        //         }
        //
        //     }
        //
        // });

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;