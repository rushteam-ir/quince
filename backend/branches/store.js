const router = express.Router();

router.get('/', async(req,res)=>{

    res.redirect(`${config.backend_url}store/list`);

});

router.get('/list', async(req,res)=>{

    try{

        let data = {

            list : await product_model.get()

        }

        res.render('store/store-list', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.get('/add', async(req,res)=>{

    try{

        let data = {

            list : await category_model.get(),

        }

        res.render('store/store-add', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/add', async(req,res)=>{

    try{

        let {title_inp, parent_inp, child_inp, describe_inp, price_inp, stock_inp, discount_inp} = req.body;
        let product_features_inp = req.body['product_features_inp[]'];

        let valid_title = validation.isSafe(title_inp);
        let valid_parent = isObjectId(parent_inp);
        let valid_child = isObjectId(child_inp);
        let valid_describe = validation.isSafe(describe_inp);
        let valid_price = validation.isSafe(price_inp);
        let valid_stock = validation.isSafe(stock_inp);
        let valid_discount = validation.isSafe(discount_inp);
        let valid_product_features = [];

        for(let i = 0; i < product_features_inp.length; i++){

            valid_product_features[i] = validation.isSafe(product_features_inp[i]);

        }

        if(valid_title != ''){
            return res.redirect(`${config.backend_url}store/add/?msg=${valid_title}`);
        }
        else if(!valid_parent){
            return res.redirect(`${config.backend_url}store/add/?msg=invalid-input`);
        }
        else if(!valid_child){
            return res.redirect(`${config.backend_url}store/add/?msg=invalid-input`);
        }
        else if(valid_describe != ''){
            return res.redirect(`${config.backend_url}store/add/?msg=${valid_describe}`);
        }
        else if(valid_stock != ''){
            return res.redirect(`${config.backend_url}store/add/?msg=${valid_stock}`);
        }
        else if(valid_discount != ''){
            return res.redirect(`${config.backend_url}store/add/?msg=${valid_discount}`);
        }
        else if(valid_price != ''){
            return res.redirect(`${config.backend_url}store/add/?msg=${valid_price}`);
        }
        else if(!valid_product_features.includes('')){
            return res.redirect(`${config.backend_url}store/add/?msg=${valid_product_features[0]}`);
        }

        let new_product = {

            title : title_inp,
            category : parent_inp,
            sub_category : child_inp,
            describe : describe_inp,
            stock : stock_inp,
            price : price_inp,
            discount : discount_inp,
            features : product_features_inp,
            last_edit : getCurrentDate(),
            author : req.session.admin_id,
            status : true,
            purchases : '0',
            points : '0'

        };

        let result = await product_model.add(new_product);

        if(result){

            if (req.files) {

                let main_image = req.files.product_main_image;
                let other_images = req.files['product_images[]'];

                let other_image_counter = 0;
                let product_images = [];

                let file_format1 = main_image.name.slice(-3).toLowerCase();
                let file_format2 = main_image.name.slice(-4).toLowerCase();

                if(backend_allowd_avatars.includes(file_format1) || backend_allowd_avatars.includes(file_format2)){

                    if(main_image.size/1024 <= backend_limited_products_size){

                        let _name = `${result._id}_main.png`;
                        let main_image_path = `${backend_upload_dir}products/${_name}`;
                        main_image.mv(main_image_path, (err)=>{});
                        product_images.push(`${_name}`);

                        if(Array.isArray(other_images)){

                            other_images.forEach((image)=>{

                                let file_format3 = image.name.slice(-3).toLowerCase();
                                let file_format4 = image.name.slice(-4).toLowerCase();
                                other_image_counter += 1;

                                if(backend_allowd_avatars.includes(file_format3) || backend_allowd_avatars.includes(file_format4)){

                                    if(image.size/1024 <= backend_limited_products_size){

                                        let _name = `${result._id}_${other_image_counter}.png`;
                                        let image_path = `${backend_upload_dir}products/${_name}`;
                                        image.mv(image_path, (err)=>{});
                                        product_images.push(`${_name}`);

                                    }
                                    else{

                                        return res.redirect(`${config.backend_url}store/add/?msg=limited-avatar`);

                                    }

                                }
                                else{

                                    return res.redirect(`${config.backend_url}store/add/?msg=limited-avatar`);

                                }

                            });

                        }
                        else{

                            let file_format3 = other_images.name.slice(-3).toLowerCase();
                            let file_format4 = other_images.name.slice(-4).toLowerCase();
                            other_image_counter += 1;

                            if(backend_allowd_avatars.includes(file_format3) || backend_allowd_avatars.includes(file_format4)){

                                if(other_images.size/1024 <= backend_limited_products_size){

                                    let _name = `${result._id}_${other_image_counter}.png`;
                                    let image_path = `${backend_upload_dir}products/${_name}`;
                                    other_images.mv(image_path, (err)=>{});
                                    product_images.push(`${_name}`);

                                }
                                else{

                                    return res.redirect(`${config.backend_url}store/add/?msg=limited-avatar`);

                                }

                            }
                            else{

                                return res.redirect(`${config.backend_url}store/add/?msg=limited-avatar`);

                            }

                        }


                    }
                    else{

                        return res.redirect(`${config.backend_url}store/add/?msg=limited-avatar`);

                    }

                }
                else {

                    return res.redirect(`${config.backend_url}store/add/?msg=illegal-avatar`);

                }

                let additions = {

                    images : product_images

                };

                let result2 = await product_model.edit(result._id, additions);

                if(result2){

                    return res.redirect(`${config.backend_url}store/list/?msg=add-success`)

                }
                else{

                    return res.redirect(`${config.backend_url}store/add/?msg=add-fail`);

                }

            }
            else{

                return res.redirect(`${config.backend_url}store/add/?msg=add-fail`);

            }

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;