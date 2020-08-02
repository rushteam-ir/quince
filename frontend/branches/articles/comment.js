const router = express.Router();

router.post('/', async(req,res)=>{

    try{

        let {name_inp, email_inp, text_inp} = req.body;
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
        }

        let result = await comment_model.add(comment_data);

        if(result){

            return res.redirect(`${back_url}?msg=success`)

        }
        else{

            return res.redirect(`${back_url}?msg=error`)

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;