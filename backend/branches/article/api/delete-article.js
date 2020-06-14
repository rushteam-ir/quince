const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let article_id = req.query.id;
        let back_url = req.header('Referer') || '/';

        if(isObjectId(article_id)){

            let result = await article_model.del(article_id);

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

        res.status(500).render('500', {error});

    }

});

module.exports = router;