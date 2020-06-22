const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let delete_id = req.query.id;

        if(isObjectId(delete_id)){

            let result = await message_model.del(delete_id);

            if(result){

                return res.redirect(`${config.backend_url}messages`);

            }
            else{

                return res.redirect(`${config.backend_url}messages`);

            }

        }
        else{

            return res.redirect(`${config.backend_url}messages`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;