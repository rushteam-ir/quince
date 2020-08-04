const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let delete_id = req.query.id;
        let back_url = req.header('Referer') || '/';

        if(isObjectId(delete_id)){

            let result = await user_model.del(delete_id);

            if(result){

                return res.redirect(`${back_url}`);

            }
            else{

                return res.redirect(`${back_url}`);

            }

        }
        else{

            return res.redirect(`${back_url}`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;