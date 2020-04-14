const router = express.Router();

router.get('/', async(req,res)=>{

    try{

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

        let {package_name_inp, count_inp} = req.body;
        let end_value = req.body['end_inp[]'];
        let discount_value = req.body['discount_inp[]'];

        let code = '';
        let code_id = '';

        let first_while = true;

        // Generate Code Id
        while(first_while){

            code_id = '';
            code_id = randomString(4).toLowerCase();

            // let result = await discount_model.checkId(code_id);
            //
            // if(result){
            //
            //     code += code_id + '-';
            //     first_while = false;
            //
            // }

            first_while = false;

        }

        // Generate Whole Code
        for(let j = 0; j < parseInt(count_inp); j++){

            code = code_id + '-';

            for(let i = 0; i < 4; i++){

                let code_part = '';
                code_part = randomString(4).toLowerCase() + '-'
                code += code_part;

            }

            code = code.slice(0, -1);

            log(code);

        }



        return res.redirect(`${config.backend_url}store/discount/?msg=add-success`);


    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;