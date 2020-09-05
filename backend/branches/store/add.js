const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {

            parent_list : await category_model.getParent(),

        }

        req.session.temp_files = [];

        res.render('store/store-add', data);

    }
    catch (error) {

        next(error);

    }

});

router.post('/', async(req, res, next)=>{

    try{

        let {title_inp, parent_inp, child_inp, summery_inp, describe_inp, meta_describe_inp, tags_inp,
            type_inp, tax_status_inp, monetary_unit_inp, regular_price_inp, sale_price_inp, sale_date_start_inp,
            sale_date_end_inp, stock_inp, max_order_inp, weight_inp, length_inp, width_inp, height_inp} = req.body;
        let attributes_inp = req.body['attributes_inp[]'];
        let variations_inp = req.body['variations_inp[]'];
        let new_code = randomInt(100000, 999999);
        let validation_result = new validation([
            {value : title_inp},
            {value : parent_inp, type : 'objectId'},
            {value : child_inp, type : 'objectId'},
            {value : describe_inp},
            {value : meta_describe_inp},
            {value : tags_inp ,type : 'array'},
            {value : type_inp},
            {value : tax_status_inp},
            {value : monetary_unit_inp},
            {value : regular_price_inp ,type : 'number'},
            {value : sale_price_inp ,type : 'number'},
            {value : sale_date_start_inp ,type : 'date'},
            {value : sale_date_end_inp ,type : 'date'},
            {value : stock_inp ,type : 'number'},
            {value : max_order_inp ,type : 'number'},
            {value : weight_inp ,type : 'number'},
            {value : length_inp ,type : 'number'},
            {value : width_inp ,type : 'number'},
            {value : height_inp ,type : 'number'},
            {value : attributes_inp ,type : 'array'},
            {value : variations_inp ,type : 'array'},
        ]).valid();

        if(validation_result){

            return res.json(validation_result)

        };

        while(await product_model.findOne({code : new_code})){

            new_code = randomInt(100000, 999999);

        }

        let product_url = `${code_generated}/${title_inp.split(' ').join('-').toLowerCase()}`;

        let product_data = {

            title : title_inp,
            category_parent : (parent_inp == '0') ? null : parent_inp,
            category_child : (child_inp == '0') ? null : child_inp,
            describe : describe_inp,
            meta_describe : meta_describe_inp,
            code : new_code,
            type : type_inp,
            internal_files : req.session.temp_files,
            summary : summary_inp,
            tags : tags_inp,
            tax_status : tax_status_inp,
            monetary_unit : monetary_unit_inp,
            regular_price : regular_price_inp,
            sale_price : sale_price_inp,
            stock : stock_inp,
            max_order : max_order_inp,
            weight : weight_inp,
            length : length_inp,
            width : width_inp,
            height : height_inp,
            attributes : attributes_inp,
            variations : variations_inp,
            url : product_url,
            author : req.session.admin_id

        }

        if (req.files) {

            let main_image = req.files.main_image;
            let file_name = `${randomSha1String()}.${main_image.name.split(".").pop()}`;
            let upload_result = fileManager.upload(main_image, file_name,{

                allowed_formats : `image`,
                file_path : `${backend_upload_dir}images/`,

            });

            if(upload_result){

                return res.json(upload_result)

            }

            product_data.main_image = file_name;

        }
        else{

            return res.json('یک تصویر به عنوان تصویر اصلی محصول انتخاب کنید.');

        }

        let result = await product_model.add(product_data);

        if(result){

            return res.json({
                status : 'success',
                msg : 'محصول جدید با موفقیت ثبت شد.',
                url : `${config.backend_url}store/list`
            })

        }
        else{

            return res.json('این نام تکراری می باشد لطفا از نام دیگری استفاده کنید.');

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;