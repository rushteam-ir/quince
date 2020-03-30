const router = express.Router();

router.get('/', async(req,res)=>{

    let product_id = req.query.id;
    let product = await product_model.getById(product_id);
    let product_features = product.features;

    res.json(product_features);

});

module.exports = router;