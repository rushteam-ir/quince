const router = express.Router();

router.post('/', async(req,res)=>{

    try{

        let {edit_text_inp, edit_comment_id} = req.body;
        let back_url = req.header('Referer') || '/';

        let validation_result = new validation([
            {value : edit_text_inp},
        ]).valid();

        if(validation_result){

            return res.json(validation_result);

        }

        let comment_data = {
            text : edit_text_inp,
        }

        let result = await comment_model.edit(comment_data, edit_comment_id);

        if(result){

            return res.json({
                status : 'success',
                msg : 'پیام موردنظر با موفقیت ویرایش شد.',
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