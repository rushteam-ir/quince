const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        res.render('product');

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.get('/:code', async(req,res)=>{

    try{

        let param = req.params.code;
        let product_code = parseInt(param.replace('sp-',''));

        if(Number.isNaN(product_code)){

            return res.redirect(`${config.frontend_url}product/?msg=not-found`);

        }
        else{

            let check_product = await product_model.check(product_code);

            if(check_product == false){
                return res.redirect(`${config.frontend_url}product/?msg=not-found`);
            }

            let data = {

                product : check_product

            };

            res.render('product');

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;