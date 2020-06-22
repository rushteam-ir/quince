const router = express.Router();

router.get('/:id', async(req, res, next)=>{

    try{

        let product_id = req.params.id;

        if(!product_id || !isObjectId(product_id)){

            return res.redirect(`${config.backend_url}store/list`);

        }

        let edit_product = await product_model.getById(product_id);
        let store_image_slot = backend.locals.store_image_slot_default.slice(0);
        let store_features_slot = backend.locals.store_features_slot_default.slice(0);

        for(let i = 1; i < edit_product.images.length; i++){

            let index = store_image_slot.indexOf(i);
            store_image_slot.splice(index, 1);

        }

        for(let i = 0; i < edit_product.features.length; i++){

            let index = store_features_slot.indexOf(i);
            store_features_slot.splice(index, 1);

        }

        req.session.product_edit_id = edit_product._id;

        let data = {

            list : await category_model.get(),
            product_form : edit_product,
            store_image_slot : store_image_slot,
            store_features_slot : store_features_slot,

        }

        res.render('store/store-edit', data);

    }
    catch (error) {

        next(error);

    }

});

router.post('/:id', async(req, res, next)=>{

    try{

        let product_id = req.params.id;
        let {title_inp, parent_inp, child_inp, describe_inp, price_inp, stock_inp, discount_inp} = req.body;
        let product_features_inp = req.body['product_features_inp[]'];

        let last_product = await product_model.getById(product_id);

        if(last_product.title == title_inp && last_product.describe == describe_inp && last_product.stock == stock_inp
            && last_product.price == price_inp && last_product.discount == discount_inp &&
            last_product.features.push('') == product_features_inp && !req.files){

            if(last_product.category && last_product.sub_category){

                if(last_product.category._id == parent_inp && last_product.sub_category._id == child_inp){

                    return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=no-change`);

                }

            }

        }

        let validation_result = new validation([
            {value : title_inp},
            {value : parent_inp, type : 'objectId'},
            {value : child_inp, type : 'objectId'},
            {value : describe_inp},
            {value : price_inp , type : 'number'},
            {value : stock_inp , type : 'number'},
            {value : discount_inp , type : 'number'},
            {value : product_features_inp , type : 'array'},
        ]).valid();

        if(validation_result){

            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=${validation_result}`);

        }

        let price_discount = Math.round(parseInt(price_inp) * (100 - parseInt(discount_inp)) / 100);

        let new_product = {

            title : title_inp,
            category : parent_inp,
            sub_category : child_inp,
            describe : describe_inp,
            stock : stock_inp,
            price : price_inp,
            price_discount : price_discount,
            discount : discount_inp,
            features : product_features_inp,
            last_edit : getCurrentDate(),
            images : last_product.images

        };

        let uploader_options = {

            allowed_formats : 'image',
            limited_size : backend_limited_products_size,
            file_path : `${backend_upload_dir}products/`,

        }

        if(req.files && typeof req.files.product_main_image != 'undefined'){

            let file_name = `${product_id}_main.png`;
            let upload_result = new uploader(req.files.product_main_image, file_name, uploader_options).upload();

            if(upload_result){

                return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=${upload_result}`);

            }

            new_product['images'][0] = `${file_name}`;

        }

        if(req.files && typeof req.files['product_other_images[]'] != 'undefined'){

            if(Array.isArray(req.files['product_other_images[]'])){

                for(let i = 0; i < req.files['product_other_images[]'].length; i++){

                    let empty_index = last_product.images.indexOf('');

                    if(empty_index == -1){

                        empty_index = last_product.images.length;

                    }

                    let file_name = `${product_id}_${empty_index}.png`;
                    let upload_result = new uploader(req.files['product_other_images[]'][i], file_name, uploader_options).upload();

                    if(upload_result){

                        return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=${upload_result}`);
                        break;

                    }

                    new_product['images'][empty_index] = `${file_name}`;
                    last_product['images'][empty_index] = `${file_name}`;

                }

            }
            else{

                let empty_index = last_product.images.indexOf('');

                if(empty_index == -1){

                    empty_index = last_product.images.length;

                }

                let file_name = `${product_id}_${empty_index}.png`;
                let upload_result = new uploader(req.files['product_other_images[]'], file_name, uploader_options).upload();

                if(upload_result){

                    return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=${upload_result}`);

                }

                new_product['images'][empty_index] = `${file_name}`;
                last_product['images'][empty_index] = `${file_name}`;

            }

        }

        let result = await product_model.edit(product_id, new_product);

        if(result){

            let other_images_count = 0;

            for(let i = 0; i < result.images.length; i++){

                if(result.images[i] == ''){

                    other_images_count += 1;

                }

            }

            other_images_count = result.images.length - other_images_count;

            if(result.images[0] == ''){
                return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=few-images`);
            }
            else if(other_images_count < 3){
                return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=few-images`);
            }

            return res.redirect(`${config.backend_url}store/list/?msg=edit-success`);

        }
        else{

            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=edit-fail`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;