const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {

            parent_list : await category_model.getParent(),

        }

        req.session.temp_files = [];

        res.render('article/article-add', data);

    }
    catch (error) {

        next(error);

    }

});

router.post('/', async(req, res, next)=>{

   try{

       let {title_inp, parent_inp, child_inp, summary_inp, describe_inp, meta_describe_inp} = req.body;
       let tags_inp = req.body['tags_inp[]'];
       log(tags_inp)
       let validation_result = new validation([
           {value : title_inp},
           {value : parent_inp, type : 'objectId'},
           {value : child_inp, type : 'objectId'},
           {value : describe_inp},
           {value : meta_describe_inp},
           {value : tags_inp , type : 'array'},
       ]).valid();

       if(validation_result){

           return res.json(validation_result)

       }

       let article_url = title_inp.split(' ').join('-').toLowerCase()

       let article_data = {

           title : title_inp,
           category_parent : (parent_inp == '0') ? null : parent_inp,
           category_child : (child_inp == '0') ? null : child_inp,
           describe : describe_inp,
           meta_describe : meta_describe_inp,
           url : article_url,
           internal_files : req.session.temp_files,
           summary : summary_inp,
           tags : tags_inp

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

           article_data.main_image = file_name;

       }
       else{

           return res.json('یک تصویر به عنوان تصویر اصلی مقاله انتخاب کنید.')

       }

       let result = await article_model.add(article_data, req.session.admin_id);

       if(result){

           return res.json({
               status : 'success',
               url : `${config.backend_url}article/list`,
               msg : `مقاله جدید با موفقیت ثبت شد.`
           })

       }
       else{

           return res.json('این نام تکراری می باشد، لطفا از نام دیگری استفاده کنید.')

       }

   }
   catch (error) {

       next(error);

   }

});

module.exports = router;