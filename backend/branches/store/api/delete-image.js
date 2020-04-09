const router = express.Router();

router.get('/', async(req,res)=>{

    try {

        let image_id = req.query.id;
        let find_product = await product_model.getById(backend.locals.product_edit_id);

        if(find_product){

            let find_image_name = find_product.images[parseInt(image_id)];
            let all_images = find_product.images;

            all_images[(parseInt(image_id))] = '';

            let product_data = {

                images : all_images

            }

            let result = await product_model.edit(backend.locals.product_edit_id, product_data);

            if(result){

                await fs.unlinkSync(`${backend_upload_dir}products/${find_image_name}`);
                res.redirect(`${config.backend_url}store/edit/${backend.locals.product_edit_id}/?msg=delete-success`);

            }
            else{

                res.redirect(`${config.backend_url}store/edit/${backend.locals.product_edit_id}/?msg=delete-fail`);

            }

        }
        else{

            res.redirect(`${config.backend_url}store/edit/${backend.locals.product_edit_id}/?msg=delete-fail`);

        }

    }
    catch(error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;