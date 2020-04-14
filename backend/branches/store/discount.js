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

        let first_while = true;

        while(first_while){

            let code_id = '';
            code_id = randomString(4).toLowerCase();

            let result = await discount_model.checkId(code_id);

            if(result){

                first_while = false;

            }

        }





        return res.redirect(`${config.backend_url}store/discount/?msg=add-success`);


    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;