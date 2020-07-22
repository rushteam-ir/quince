const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let delete_id = req.query.id;

        if(isObjectId(delete_id)){

            let admin_find = await admin_model.getById(delete_id);
            let result = await admin_model.del(delete_id);

            if(result){

                return res.redirect(`${config.backend_url}groups/admins`);

            }
            else{

                return res.redirect(`${config.backend_url}groups/admins`);

            }

        }
        else{

            return res.redirect(`${config.backend_url}groups/admins`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;