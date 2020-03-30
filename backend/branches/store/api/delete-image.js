const router = express.Router();

router.get('/', async(req,res)=>{

    let product_id = backend.locals.product_form._id;

    try {
        let image_name = req.query.id;
        let image_path = `${backend_upload_dir}products/${image_name}.png`;
        let product = await product_model.getById(product_id);
        let all_images = product.images;

        if(image_name.includes('main')){
            all_images[0] = '';

            fs.unlinkSync(image_path);
            backend.locals.product_form.images[0] = '';
        }
        else{
            let index = parseInt(image_name.slice(-1));
            all_images[index] = '';

            fs.unlinkSync(image_path);
            backend.locals.product_form.images[0] = '';
        }

        let product_data = {
            images : all_images
        }

        let result2 = await product_model.edit(product_id, product_data);

        if(result2){
            res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=delete-success`);
        }
        else{
            res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=delete-fail`);
        }

    } catch(err) {

        res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=delete-fail`);

    }

});

module.exports = router;