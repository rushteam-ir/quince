const router = express.Router();

router.post('/', async(req,res)=>{

    try{

        let {name_inp, email_inp, text_inp, author_inp, root_inp} = req.body;
        log(req.body)

        let back_url = req.header('Referer') || '/';

        let validation_result = new validation([
            {value : email_inp, type : 'email'},
            {value : text_inp},
            {value : name_inp},
        ]).valid();

        if(validation_result){

            return res.redirect(`${back_url}/?msg=${validation_result}`)

        }

        let comment_data = {
            text : text_inp,
            email : email_inp,
            name : name_inp,
            response : req.session.article_id,
            reply_to : author_inp,
            parent_id : root_inp,
        }

        let result = await comment_model.reply(comment_data, root_inp);

        if(result){

            return res.redirect(`${back_url}/?msg=success`)

        }
        else{

            return res.redirect(`${back_url}/?msg=error`)

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;