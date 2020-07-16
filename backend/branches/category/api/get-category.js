const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let category_id = req.body.id;

        if(isObjectId(category_id)){

            let category = await category_model.getCat(category_id);

            res.json(category);

        }
        else{

            return res.redirect(`${config.backend_url}category`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;