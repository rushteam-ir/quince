const router = express.Router();

router.get('/:id', async(req, res, next)=>{

    try{

        let article_id = req.params.id
        let find_article = await article_model.getByUniqueId(article_id);

        if(!find_article){

            return res.status(404).render('errors/404');

        }

        let data = {

            article_info : find_article,
            parent_list : await category_model.getParent(),

        }

        if(find_article.category_parent != null){

            data.child_list = await category_model.getSub(find_article.category_parent._id);

        }

        req.session.temp_files = [];

        res.render('article/article-edit', data);

    }
    catch (error) {

        next(error);

    }

});

router.post('/:id', async(req, res, next)=>{

   try{

       let article_id = req.params.id;
       let find_article = await article_model.getByUniqueId(article_id);
       let {title_inp, parent_inp, child_inp, describe_inp, meta_describe_inp} = req.body;
       let validation_result = new validation([
           {value : title_inp},
           {value : parent_inp, type : 'objectId'},
           {value : child_inp, type : 'objectId'},
           {value : describe_inp},
           {value : meta_describe_inp},
       ]).valid()

       if(validation_result){

           return res.json(validation_result);

       }

       let article_url = title_inp.split(' ').join('-').toLowerCase();

       let article_data = {

           title : title_inp,
           category_parent : (parent_inp == '0') ? null : parent_inp,
           category_child : (child_inp == '0') ? null : child_inp,
           describe : describe_inp,
           meta_describe : meta_describe_inp,
           url : `${config.frontend_url}articles/${article_url}`,
           internal_files : req.session.temp_files,

       }

       if(find_article.main_image == ""){

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

               return res.json('یک تصویر به عنوان تصویر اصلی مقاله انتخاب کنید.');

           }

       }

       let result = await article_model.edit(article_id, article_data);

       if(result){

           return res.json({
               status : 'success',
               url : `${config.backend_url}article/list`,
               msg : `مقاله موردنظر با موفقیت ویرایش شد`
           })

       }
       else{

           return res.json('نام مقاله تکراری می باشد، لطفا از نام دیگری استفاده کنید.')

       }

   }
   catch (error) {

       next(error);

   }

});

module.exports = router;