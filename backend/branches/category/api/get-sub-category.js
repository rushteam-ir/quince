const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let parent_id = req.query.id;

        if(isObjectId(parent_id)){

            let sub_category = await category_model.getSub(parent_id);

            res.json(sub_category);

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