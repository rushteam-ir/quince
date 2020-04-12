const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let data = {

            list : await discount_model.get()

        }

        res.render('store/store-discount-codes', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        let {value_inp} = req.body;
        let discount_code = '';
        let valid_value = validation.isSafe(value_inp);

        if(valid_value != ''){
            return res.redirect(`${config.backend_url}store/discount-codes`);
        }

        for(let i = 0; i < 3; i++){

            let code_part = randomString(4) + '-';
            discount_code += code_part.toLowerCase();

        }

        discount_code = discount_code.slice(0, -1);

        let result = await discount_model.add(discount_code, value_inp);

        if(result){

            return res.redirect(`${config.backend_url}store/discount-codes/?msg=add-success`);

        }
        else {

            return res.redirect(`${config.backend_url}store/discount-codes/?msg=add-fail`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;