const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('articles/articles');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.get('/:name', async(req,res)=>{

    try{

        let article_name = req.params.name;
        res.render('articles/articles');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;