const router = express.Router();

router.get('/:id', async(req,res)=>{

    try{

        let article_id = req.params.id
        let find_article = await article_model.getByUniqueId(article_id);

        if(!find_article){

            return res.status(404).render('404');

        }

        let data = {

            article_info : find_article,
            parent_list : await category_model.getParent(),
            child_list : await category_model.getSub(find_article.category_parent._id),

        }

        req.session.temp_files = [];

        res.render('article/article-edit', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/:id', async(req,res)=>{

   try{

       let article_id = req.params.id
       let {title_inp, parent_inp, child_inp, describe_inp, keys_inp} = req.body;
       let validation_result = new validation([
           {value : title_inp},
           {value : parent_inp, type : 'objectId'},
           {value : child_inp, type : 'objectId'},
           {value : describe_inp},
           {value : keys_inp}
       ]).valid()

       if(validation_result){

           return res.redirect(`${config.backend_url}article/edit/${article_id}/?msg=${validation_result}`);

       }

       let article_url = title_inp.split(' ').join('-')

       let article_data = {

           title : title_inp,
           category_parent : parent_inp,
           category_child : child_inp,
           describe : describe_inp,
           keys : keys_inp,
           url : `${config.frontend_url}article/${article_url}`,
           internal_files : req.session.temp_files

       }

       log(article_data)

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

               return res.redirect(`${config.backend_url}article/edit/${article_id}/?msg=${upload_result}`);

           }

           article_data.main_image = file_name;

       }

       let result = await article_model.edit(req.session.article_edit_id, article_data);

       if(result){

           return res.redirect(`${config.backend_url}article/edit/${article_id}/?msg=add-success`)

       }
       else{

           return res.redirect(`${config.backend_url}article/edit/${article_id}/?msg=add-fail`)

       }

   }
   catch (error) {

       res.status(500).render('500', {error});

   }

});

module.exports = router;