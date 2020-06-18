const router = express.Router();

router.get('/:id', async(req,res)=>{

    try{

        let article_id = req.params.id

        if(!isObjectId(article_id)){

            return res.status(404).render('404');

        }

        let data = {

            article_info : await article_model.getById(article_id),
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