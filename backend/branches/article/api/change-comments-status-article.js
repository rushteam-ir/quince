const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let article_id = req.query.id;
        let back_url = req.header('Referer') || '/';

        if(isObjectId(article_id)){

            let result = await article_model.changeCommentsStatus(article_id);

            if(result){

                return res.redirect(back_url);

            }
            else{

                return res.redirect(back_url);

            }

        }
        else{

            return res.redirect(back_url);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;