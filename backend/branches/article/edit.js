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

        }

        req.session.article_internal_files = []

        res.render('article/article-edit', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

   try{



   }
   catch (error) {

       res.status(500).render('500', {error});

   }

});

module.exports = router;