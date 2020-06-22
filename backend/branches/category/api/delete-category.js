const router = express.Router();

router.get('/', async(req, res, next)=>{

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

        next(error);

    }

});

module.exports = router;