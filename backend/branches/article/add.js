const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('article/article-add');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

   try{

       let {title_inp, parent_inp, child_inp, describe_inp, keys_inp} = req.body
       let validation_result = new validation([
           {value : title_inp},
           {value : parent_inp, type : 'objectId'},
           {value : child_inp, type : 'objectId'},
           {value : describe_inp},
           {value : keys_inp}
       ])

       if(validation_result){

           return res.redirect(`${config.backend_url}article/add/?msg=${validation_result}`);

       }

       let article_data = {

           title : title_inp,
           category_parent : parent_inp,
           category_child : child_inp,
           describe : describe_inp,
           keys : keys_inp

       }

        let result = await article_model.add(article_data, req.session.admin_id)

       if(result){

           res.redirect(`${config.backend_url}article/add/?msg=add-fail`)

       }
       else{

           res.redirect(`${config.backend_url}article/add/?msg=add-success`)

       }

   }
   catch (error) {

       res.status(500).render('500', {error});

   }

});

module.exports = router;