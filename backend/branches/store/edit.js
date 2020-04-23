const router = express.Router();

router.get('/:id', async(req,res)=>{

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

        res.status(500).render('500', {error});

    }

});

router.post('/:id', async(req,res)=>{

    try{

        let product_id = req.params.id;
        let {title_inp, parent_inp, child_inp, describe_inp, price_inp, stock_inp, discount_inp} = req.body;
        let product_features_inp = req.body['product_features_inp[]'];

        let last_product = await product_model.getById(product_id);

        if(!Array.isArray(product_features_inp)){

            product_features_inp = [];
            product_features_inp.push('');

        }

        let valid_title = validation.isSafe(title_inp);
        let valid_parent = isObjectId(parent_inp);
        let valid_child = isObjectId(child_inp);
        let valid_describe = validation.isSafe(describe_inp);
        let valid_price = validation.isSafe(price_inp);
        let valid_stock = validation.isSafe(stock_inp);
        let valid_discount = validation.isSafe(discount_inp);

        for(let i = 0; i < product_features_inp.length; i++){

            if(product_features_inp[i] == ''){

                product_features_inp.splice(i , 1);

            }

        }

        if(last_product.title == title_inp && last_product.category._id == parent_inp && last_product.sub_category._id == child_inp &&
            last_product.describe == describe_inp && last_product.stock == stock_inp && last_product.price == price_inp &&
            last_product.discount == discount_inp && !req.files){

            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=no-change`);

        }

        if(valid_title != ''){
            return res.redirect(`${config.backend_url}store/edit/${product_id}`);
        }
        else if(!valid_parent){
            return res.redirect(`${config.backend_url}store/edit/${product_id}`);
        }
        else if(!valid_child){
            return res.redirect(`${config.backend_url}store/edit/${product_id}`);
        }
        else if(valid_describe != ''){
            return res.redirect(`${config.backend_url}store/edit/${product_id}`);
        }
        else if(valid_stock != ''){
            return res.redirect(`${config.backend_url}store/edit/${product_id}`);
        }
        else if(valid_discount != ''){
            return res.redirect(`${config.backend_url}store/edit/${product_id}`);
        }
        else if(valid_price != ''){
            return res.redirect(`${config.backend_url}store/edit/${product_id}`);
        }
        else if(product_features_inp.length == 0){
            return res.redirect(`${config.backend_url}store/edit/${product_id}`);
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

        if(req.files && typeof req.files.product_main_image != 'undefined'){

            let main_image = req.files.product_main_image;
            let product_images = [];

            let file_format1 = main_image.name.slice(-3).toLowerCase();
            let file_format2 = main_image.name.slice(-4).toLowerCase();

            if(backend_allowd_avatars.includes(file_format1) || backend_allowd_avatars.includes(file_format2)) {

                if(main_image.size/1024 <= backend_limited_products_size){

                    let _name = `${product_id}_main.png`;
                    let main_image_path = `${backend_upload_dir}products/${_name}`;
                    main_image.mv(main_image_path, (err)=>{});
                    product_images.push(`${_name}`);

                }
                else{

                    return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=limited-image`);

                }

            }
            else{

                return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=illegal-image`);

            }

            new_product['images'][0] = product_images;

        }

        if(req.files && typeof req.files['product_other_images[]'] != 'undefined'){

            let other_images = req.files['product_other_images[]'];

            if(Array.isArray(other_images)){

                other_images.forEach((image)=>{

                    let empty_index = last_product.images.indexOf('');
                    if(empty_index == -1){
                        empty_index = last_product.images.length;
                    }
                    let file_format3 = image.name.slice(-3).toLowerCase();
                    let file_format4 = image.name.slice(-4).toLowerCase();

                    if(backend_allowd_avatars.includes(file_format3) || backend_allowd_avatars.includes(file_format4)) {

                        if(image.size/1024 <= backend_limited_products_size){

                            let _name = `${product_id}_${empty_index}.png`;
                            let other_image_path = `${backend_upload_dir}products/${_name}`;
                            image.mv(other_image_path, (err)=>{});

                            new_product['images'][empty_index] = `${_name}`;
                            last_product['images'][empty_index] = `${_name}`;

                        }
                        else{

                            return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=limited-image`);

                        }

                    }
                    else{

                        return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=illegal-image`);

                    }

                })

            }
            else{

                let image = req.files['product_other_images[]'];
                let empty_index = last_product.images.indexOf('');
                if(empty_index == -1){
                    empty_index = last_product.images.length;
                }
                let file_format3 = image.name.slice(-3).toLowerCase();
                let file_format4 = image.name.slice(-4).toLowerCase();

                if(backend_allowd_avatars.includes(file_format3) || backend_allowd_avatars.includes(file_format4)) {

                    if(image.size/1024 <= backend_limited_products_size){

                        let _name = `${product_id}_${empty_index}.png`;
                        let other_image_path = `${backend_upload_dir}products/${_name}`;
                        image.mv(other_image_path, (err)=>{});

                        new_product['images'][empty_index] = `${_name}`;
                        last_product['images'][empty_index] = `${_name}`;

                    }
                    else{

                        return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=limited-image`);

                    }

                }
                else{

                    return res.redirect(`${config.backend_url}store/edit/${product_id}/?msg=illegal-image`);

                }

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

        res.status(500).render('500', {error});

    }

});

module.exports = router;