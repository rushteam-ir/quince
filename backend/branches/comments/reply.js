const router = express.Router();

router.post('/', async(req,res)=>{

    try{

        let {reply_text_inp, response_inp, reply_to_inp, root_inp} = req.body;

        let back_url = req.header('Referer') || '/';

        let validation_result = new validation([
            {value : reply_text_inp},
        ]).valid();

        if(validation_result){

            return res.json(validation_result);

        }

        let comment_data = {
            text : reply_text_inp,
            author : req.session.admin_id,
            response : response_inp,
            reply_to : reply_to_inp,
            parent_id : root_inp,
        }

        let result = await comment_model.reply(comment_data, root_inp);

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

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;