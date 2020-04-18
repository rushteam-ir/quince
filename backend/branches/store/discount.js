const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        await discount_model.checkExpiration();

        let data = {

            list : await discount_model.get()

        }

        res.render('store/store-discount', data);

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

router.post('/', async(req,res)=>{

    try{

        let {package_name_inp, count_inp, day_inp, month_inp, year_inp} = req.body;
        let end_value = req.body['end_inp[]'];
        let discount_value = req.body['discount_inp[]'];
        let current_date = getCurrentDate().split('/');

        let valid_package_name = validation.isSafe(package_name_inp);

        if(valid_package_name != ''){

            return res.redirect(`${config.backend_url}store/discount`);

        }


        let code = '';
        let code_id = '';
        let expiration_date = '';

        let first_while = true;

        // Generate Code Id
        while(first_while){

            code_id = '';
            code_id = randomString(4);

            let result = await discount_model.checkId(code_id);

            if(!result){

                code += code_id + '-';
                first_while = false;

            }

        }

        // Generate Whole Code
        let codes = [];
        for(let j = 0; j < parseInt(count_inp); j++){

            code = code_id + '-';

            for(let i = 0; i < 4; i++){

                let code_part = '';
                code_part = randomString(4) + '-'
                code += code_part;

            }

            code = code.slice(0, -1);
            codes.push({

                code : code

            });

        }

        // Generate Values for all price amounts
        let amounts = [];

        if(Array.isArray(end_value)){

            for(let i = 0; i < parseInt(end_value.length); i++){

                let amount_sample = {

                    start : end_value[i-1],
                    end : end_value[i],
                    value : discount_value[i],

                }

                amounts.push(amount_sample);

            }

        }
        else{

            let amount_sample = {

                start : 0,
                end : end_value,
                value : discount_value,

            }

            amounts.push(amount_sample);

        }

        amounts[0].start = '0';

        if(`${year_inp}/${month_inp}/${day_inp}` == '//'){

            expiration_date = '0';

        }
        else{

            expiration_date = `${year_inp}/${month_inp}/${day_inp}`;

        }

        let new_discount = {

            package_name : package_name_inp,
            code_id : code_id,
            codes : codes,
            values : amounts,
            codes_number : parseInt(count_inp),
            codes_active : parseInt(count_inp),
            expiration_date : expiration_date

        }

        log(new_discount);

        let result = await discount_model.add(new_discount);

        if(result){

            return res.redirect(`${config.backend_url}store/discount/?msg=add-success`);

        }
        else{

            return res.redirect(`${config.backend_url}store/discount/?msg=add-fail`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;