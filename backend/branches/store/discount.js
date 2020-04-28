const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        await discount_model.checkExpiration();

        let data = {

            list : await discount_model.get(),
            current_date : getCurrentDate()

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
        let exp_date = JalaliConvert([year_inp, month_inp, day_inp]);
        let curr_date = JalaliConvert(getCurrentDate().split('/'));
        let time_difference = exp_date.getTime() - curr_date.getTime();
        let valid_end_inp = true;

        if(!Array.isArray(end_value)){

            end_value = [];
            end_value.push('');

        }

        if(!Array.isArray(discount_value)){

            discount_value = [];
            discount_value.push('');

        }

        for(let i = 1; i < end_value.length - 1; i++){

            let current_number = parseInt(end_value[i]);
            let perv_number = parseInt(end_value[i-1]);

            if(!isNaN(current_number) && !isNaN(perv_number)){

                if(current_number <= perv_number){

                    valid_end_inp = false;

                }
                if(current_number < 0 || perv_number < 0){

                    valid_end_inp = false;

                }

            }
            else{

                valid_end_inp = false;

            }
        }

        for(let i = 0; i < discount_value.length; i++){

            if(isNaN(discount_value[i])){

                discount_value.splice(i , 1);

            }

        }

        if(time_difference < 0){
            return res.redirect(`${config.backend_url}store/discount/?msg=date-error`);
        }
        else if(end_value[0] != '' && end_value[end_value.length - 1] != ''){
            if(isNaN(parseInt(end_value[0])) || isNaN(parseInt(end_value[end_value.length - 1]))){
                return res.redirect(`${config.backend_url}store/discount/?msg=number-error`);
            }
        }
        else if(!valid_end_inp){
            return res.redirect(`${config.backend_url}store/discount/?msg=number-error`);
        }
        else if(discount_value.length == 0){
            return res.redirect(`${config.backend_url}store/discount/?msg=discount-error`);
        }
        else if(parseInt(day_inp) < 0 || parseInt(day_inp) > 31){
            return res.redirect(`${config.backend_url}store/discount/?msg=date-error`);
        }
        else if(parseInt(month_inp) < 0 || parseInt(month_inp) > 12){
            return res.redirect(`${config.backend_url}store/discount/?msg=date-error`);
        }
        else if(parseInt(year_inp) < 1399){
            return res.redirect(`${config.backend_url}store/discount/?msg=date-error`);
        }

        let validation_result = new validation([
            {value : package_name_inp},
            {value : count_inp , type : 'number'},
        ]).valid();

        if(validation_result){

            return res.redirect(`${config.backend_url}store/discount/?msg=${validation_result}`);

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
            codes.push(code);

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