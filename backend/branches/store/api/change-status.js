const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let product_id = req.query.id;

        if(isObjectId(product_id)){

            let find_product = await product_model.getById(product_id);
            let new_status = true;

            if(find_product.status == true){

                new_status = false;

            }
            else{

                new_status = true;

            }

            let product_data = {

                status : new_status

            }

            let result = await product_model.edit(product_id, product_data);

            if(result){
                return res.redirect(`${config.backend_url}store/list/?msg=change-success`);
            }
            else{
                return res.redirect(`${config.backend_url}store/list`);
            }

        }
        else{

            return res.redirect(`${config.backend_url}store/list`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;