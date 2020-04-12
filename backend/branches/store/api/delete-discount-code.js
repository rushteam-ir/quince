const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let discount_id = req.query.id;

        if(isObjectId(discount_id)){

            let result = await discount_model.del(discount_id);

            if(result){

                return res.redirect(`${config.backend_url}discount-codes`);

            }
            else{

                return res.redirect(`${config.backend_url}discount-codes`);

            }

        }
        else{

            return res.redirect(`${config.backend_url}discount-codes`);

        }

    }
    catch (error) {

        res.status(500).render('500', {error});

    }

});

module.exports = router;