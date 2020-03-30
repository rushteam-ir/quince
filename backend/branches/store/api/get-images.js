const router = express.Router();

router.get('/', async(req,res)=>{

    let product_id = req.query.id;
    let product = await product_model.getById(product_id);
    let product_images = product.images;

    res.json(product_images);

});

module.exports = router;