const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let delete_id = req.query.id;

        if(isObjectId(delete_id)){

            let admin_find = await user_model.getById(delete_id);

            let result = await user_model.del(delete_id);

            if(result){

                return res.redirect(`${config.backend_url}users/list`);

            }
            else{

                return res.redirect(`${config.backend_url}users/list`);

            }

        }
        else{

            return res.redirect(`${config.backend_url}users/list`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;