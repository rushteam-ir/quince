const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('product');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.get('/:title', async(req,res)=>{

    try{

        let product_title = req.params.title;
        let check_product = await product_model.check(product_title);

        if(!check_product){
            return res.redirect(`${config.frontend_url}product/?msg=not-found`);
        }

        let data = {

            product : await product_model.getById(product_id)

        }

        res.render('product');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;