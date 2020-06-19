const router = express.Router();

router.get('/', async(req,res)=>{

    try {

        let image_id = req.query.id;
        let find_product = await product_model.getById(req.session.product_edit_id);

        if(find_product){

            let find_image_name = find_product.images[parseInt(image_id)];
            let all_images = find_product.images;

            all_images[(parseInt(image_id))] = '';

            let product_data = {

                images : all_images

            }

            let result = await product_model.edit(req.session.product_edit_id, product_data);

            if(result){

                fs.unlink(`${backend_upload_dir}products/${find_image_name}`, function(err) {})
                res.redirect(`${config.backend_url}store/edit/${req.session.product_edit_id}`);

            }
            else{

                res.redirect(`${config.backend_url}store/edit/${req.session.product_edit_id}`);

            }

        }
        else{

            res.redirect(`${config.backend_url}store/edit/${req.session.product_edit_id}`);

        }

    }
    catch(error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;