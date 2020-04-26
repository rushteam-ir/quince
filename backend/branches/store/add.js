const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let data = null;

        if(Object.keys(req.query).length === 0){
            delete req.session.product_add_from;

            data = {

                list : await category_model.get(),

            }
        }
        else{

            data = {

                list : await category_model.get(),
                product_add_from : req.session.product_add_form,

            }

        }

        res.render('store/store-add', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        let {title_inp, parent_inp, child_inp, describe_inp, price_inp, stock_inp, discount_inp} = req.body;
        let product_features_inp = req.body['product_features_inp[]'];
        let product_form = {title_inp, describe_inp, price_inp, stock_inp, discount_inp};

        req.session.product_add_form = product_form;

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

        if(valid_title != ''){
            return res.redirect(`${config.backend_url}store/add`);
        }
        else if(!valid_parent){
            return res.redirect(`${config.backend_url}store/add`);
        }
        else if(!valid_child){
            return res.redirect(`${config.backend_url}store/add`);
        }
        else if(valid_describe != ''){
            return res.redirect(`${config.backend_url}store/add`);
        }
        else if(valid_stock != ''){
            return res.redirect(`${config.backend_url}store/add`);
        }
        else if(valid_discount != ''){
            return res.redirect(`${config.backend_url}store/add`);
        }
        else if(valid_price != ''){
            return res.redirect(`${config.backend_url}store/add`);
        }
        else if(product_features_inp.length == 0){
            return res.redirect(`${config.backend_url}store/add/?msg=empty-field`);
        }
        else if(!req.files){
            return res.redirect(`${config.backend_url}store/add/?msg=few-images`);
        }
        else if(!req.files.product_main_image){
            return res.redirect(`${config.backend_url}store/add/?msg=few-images`);
        }
        else if(!req.files['product_other_images[]']){
            return res.redirect(`${config.backend_url}store/add/?msg=few-images`);
        }
        else if(req.files['product_other_images[]'].length < 3){
            return res.redirect(`${config.backend_url}store/add/?msg=few-images`);
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
            author : req.session.admin_id,
            status : true,
            purchases : '0',
            points : '0'

        };

        let result = await product_model.add(new_product);

        if(result){

            if(req.files){

                let product_images = [];
                let uploader_options = {

                    allowed_formats : 'image',
                    limited_size : backend_limited_products_size,
                    file_path : `${backend_upload_dir}products/`,

                }

                let file_name = `${result._id}_main.png`;
                let new_uploader = new uploader(req.files.product_main_image, file_name, uploader_options);
                let upload_result = new_uploader.upload();

                if(upload_result){

                    return res.redirect(`${config.backend_url}store/add/?msg=${upload_result}`);

                }

                product_images.push(`${file_name}`);

                for(let i = 0; i < req.files['product_other_images[]'].length; i++){

                    let file_name = `${result._id}_${i+1}.png`;
                    let new_uploader = new uploader(req.files['product_other_images[]'][i], file_name, uploader_options);
                    let upload_result = new_uploader.upload();

                    if(upload_result){

                        return res.redirect(`${config.backend_url}store/add/?msg=${upload_result}`);
                        break;

                    }

                    product_images.push(`${file_name}`);

                }

                log(product_images);
                new_product['images'] = product_images;

            }

            let final_result = await product_model.edit(result._id, new_product);

            if(final_result){

                delete req.session.product_add_form;
                return res.redirect(`${config.backend_url}store/list/?msg=add-success`);

            }
            else{

                return res.redirect(`${config.backend_url}store/add/?msg=add-fail`);

            }

        }
        else{

            return res.redirect(`${config.backend_url}store/add/?msg=add-fail`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;