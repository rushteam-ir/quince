const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let access_id = req.body.id;

        if(isObjectId(access_id)){

            let access_list = await access_model.getById(access_id);

            res.json(access_list);

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