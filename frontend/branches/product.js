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

        let param = req.params.title;
        let product_title = param.trim().replace('-', ' ');
        let check_product = await product_model.check(product_title);

        if(check_product == false){
            return res.redirect(`${config.frontend_url}product/?msg=not-found`);
        }

        let data = {

            product : check_product

        };

        res.render('product');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;