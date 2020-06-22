const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let discount_id = req.query.id;

        if(isObjectId(discount_id)){

            let find_discount = await discount_model.getById(discount_id);
            let file_text = ``;

            for(let i = 0; i < find_discount.codes_active; i++){

                file_text += find_discount.codes[i] + '<br><br>';

            }

            res.send(file_text);

        }
        else{

            return res.redirect(`${config.backend_url}store/discount`);

        }
        
    }
    catch (error) {

        next(error);

    }

});

module.exports = router;