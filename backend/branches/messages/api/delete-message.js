const router = express.Router();

router.get('/', async(req,res)=>{

    try{

        let delete_id = req.query.id;

        if(isObjectId(delete_id)){

            let result = await message_model.del(delete_id);

            if(result){

                return res.redirect(`${config.backend_url}messages/?msg=delete-success`);

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

        res.status(500).render('500', {error});

    }

});

module.exports = router;