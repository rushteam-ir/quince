const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let data = {

            parent_list : await category_model.getParent(),

        }

        req.session.article_internal_files = []

        res.render('article/article-add', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

   try{

       let {title_inp, parent_inp, child_inp, describe_inp, keys_inp} = req.body;
       let validation_result = new validation([
           {value : title_inp},
           {value : parent_inp, type : 'objectId'},
           {value : child_inp, type : 'objectId'},
           {value : describe_inp},
           {value : keys_inp}
       ]).valid()

       if(validation_result){

           return res.redirect(`${config.backend_url}article/add/?msg=${validation_result}`);

       }

       let article_url = title_inp.split(' ').join('_')

       let article_data = {

           title : title_inp,
           category_parent : parent_inp,
           category_child : child_inp,
           describe : describe_inp,
           keys : keys_inp,
           url : `${config.frontend_url}article/${article_url}`,
           internal_files : req.session.article_internal_files

       }

       if (req.files) {

           let main_image = req.files.main_image;
           let uploader_options = {

               allowed_formats : 'image',
               limited_size : backend_limited_images_size,
               file_path : `${backend_upload_dir}images/`,

           }

           let file_name = `${randomSha1String()}.${main_image.name.split(".").pop()}`;
           let upload_result = new uploader(main_image, file_name, uploader_options).upload();

           if(upload_result){

               return res.redirect(`${config.backend_url}article/add/?msg=${upload_result}`);

           }

           article_data.main_image = file_name;

       }

       let result = await article_model.add(article_data, req.session.admin_id);

       if(result){

           return res.redirect(`${config.backend_url}article/list/?msg=add-success`)

       }
       else{

           return res.redirect(`${config.backend_url}article/add/?msg=add-fail`)

       }

   }
   catch (error) {

       res.status(500).render('500', {error});

   }

});

module.exports = router;