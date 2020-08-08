const router = express.Router();

router.get('/', async(req, res, next)=>{

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

        rnext(error);

    }

});

module.exports = router;