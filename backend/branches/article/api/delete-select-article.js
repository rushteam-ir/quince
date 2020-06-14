const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        log('salam')
        let id_list = req.query.id;
        let back_url = req.header('Referer') || '/';

        for(let i = 0; i < id_list.length; i++){

            let article_id = id_list[i];

            if(isObjectId(article_id)){

                let result = await article_model.del(article_id);

                if(!result){

                    break;

                }

            }
            else{

                break;

            }

        }

        return res.redirect(back_url);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;