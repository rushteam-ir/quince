const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let category_id = req.query.id;
        let back_url = req.header('Referer') || '/';

        if(isObjectId(category_id)){

            let result = await category_model.del(category_id);

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