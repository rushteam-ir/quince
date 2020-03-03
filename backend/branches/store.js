const router = express.Router();

router.get('/', async(req,res)=>{

    res.redirect(`${config.backend_url}store/list`);

});

router.get('/list', async(req,res)=>{

    try{

        res.render('store/store-list');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.get('/add', async(req,res)=>{

    try{

        let data = {

            list : await category_model.get(),

        }

        log(data);
        res.render('store/store-add', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;