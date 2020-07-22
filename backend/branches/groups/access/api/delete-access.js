const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let delete_id = req.query.id;

        if(isObjectId(delete_id)){

            let result = await access_model.del(delete_id);

            if(result){

                return res.redirect(`${config.backend_url}groups/access`);

            }
            else{

                return res.redirect(`${config.backend_url}groups/access`);

            }

        }
        else{

            return res.redirect(`${config.backend_url}groups/access`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;