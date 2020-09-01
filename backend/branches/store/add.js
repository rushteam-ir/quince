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
            regular_price_inp, sale_price_inp, stock_inp, max_order_inp, weight_inp, length_inp,
            width_inp, height_inp} = req.body;

        let validation_result = new validation([
            {value : title_inp},
            {value : parent_inp, type : 'objectId'},
            {value : child_inp, type : 'objectId'},
            {value : describe_inp},
            {value : meta_describe_inp},
            {value : tags_inp ,type : 'array'},
            {value : regular_price_inp ,type : 'number'},
            {value : sale_price_inp ,type : 'number'},
            {value : stock_inp ,type : 'number'},
            {value : max_order_inp ,type : 'number'},
            {value : weight_inp ,type : 'number'},
            {value : length_inp ,type : 'number'},
            {value : width_inp ,type : 'number'},
            {value : height_inp ,type : 'number'},
        ]).valid();

        if(validation_result){

            return res.json(validation_result)

        }

        let code_generated = randomInt(1000000, 9999999);

        while(true){
            if(!await product_model.find({code : {$ne : code_generated}})){
                break;
            }
            else{
                continue;
            }
        }

        let product_url = `${code_generated}/${title_inp.split(' ').join('-').toLowerCase()}`;

        let product_data = {

            title : title_inp,
            category_parent : (parent_inp == '0') ? null : parent_inp,
            category_child : (child_inp == '0') ? null : child_inp,
            describe : describe_inp,
            meta_describe : meta_describe_inp,
            code : code_generated,
            internal_files : req.session.temp_files,
            summary : summary_inp,
            tags : tags_inp,
            regular_price : regular_price_inp,
            sale_price : sale_price_inp,
            stock : stock_inp,
            max_order : max_order_inp,
            weight : weight_inp,
            length : length_inp,
            width : width_inp,
            height : height_inp,
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