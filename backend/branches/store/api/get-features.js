const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let product_id = req.query.id;

        if(isObjectId(product_id)){

            let product = await product_model.getById(product_id);
            let product_features = product.features;

            res.json(product_features);

        }
        else{

            return res.redirect(`${config.backend_url}store/list`);

        }
        
    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;