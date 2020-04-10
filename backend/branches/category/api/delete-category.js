const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let category_id = req.query.id;

        if(isObjectId(category_id)){

            let result = await category_model.del(category_id);

            if(result){

                return res.redirect(`${config.backend_url}category/?msg=delete-success`);

            }
            else{

                return res.redirect(`${config.backend_url}category`);

            }

        }
        else{

            return res.redirect(`${config.backend_url}category`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;