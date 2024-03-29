const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('articles/articles-list');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.get('/:name', async(req,res)=>{

    try{

        // let article_name = req.params.name;
        //
        // let article_info = await article_model.getByUrl(article_name);
        //
        // if(!article_info || !article_info.status){
        //
        //     return res.status(404).send('page not found')
        //
        // }
        //
        // req.session.article_id = article_info._id
        //
        // let data = {
        //
        //     article_info : article_info,
        //     comments_list : await comment_model.getByArticleId(article_info._id),
        //
        // }

        res.render('articles/articles-show');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

const comment = require('./comment');
const reply = require('./reply');

router.use('/comment', comment);
router.use('/reply', reply);

module.exports = router;
