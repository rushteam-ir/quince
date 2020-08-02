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

        let article_name = req.params.name;

        let article_info = await article_model.getByUrl(article_name);

        if(!article_info){

            return res.status(404).send('page not found')

        }

        req.session.article_id = article_info._id
        let comments_result = await comment_model.getByArticleId(article_info._id);

        let data = {

            article_info : article_info,
            comments_list : comments_result.comments,
            replies_list : comments_result.replies,

        }

        res.render('articles/articles-show', data);

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