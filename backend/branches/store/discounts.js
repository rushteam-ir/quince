const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let data = {

            list : await discount_model.get()

        }

        res.render('store/store-discounts', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        let can_do = true;
        let {value_inp} = req.body;
        let discount_code = '';
        let valid_value = validation.isSafe(value_inp);

        if(valid_value != ''){
            return res.redirect(`${config.backend_url}store/discounts`);
        }

        while(can_do){

            discount_code = '';

            for(let i = 0; i < 3; i++){

                let code_part = randomString(4) + '-';
                discount_code += code_part.toLowerCase();

            }

            discount_code = discount_code.slice(0, -1);

            let check_unique = await discount_model.check(discount_code);

            if(check_unique.length == 0){

                can_do = false;

            }

        }

        let discount_data = {

            code : discount_code,
            value : value_inp

        };

        let result = await discount_model.add(discount_data);

        if(result){

            return res.redirect(`${config.backend_url}store/discounts/?msg=add-success`);

        }
        else {

            return res.redirect(`${config.backend_url}store/discounts/?msg=add-fail`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;