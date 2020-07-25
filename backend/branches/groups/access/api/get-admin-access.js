const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let admin_id = req.body.id;

        if(isObjectId(admin_id)){

            let this_admin = await admin_model.getById(admin_id);
            let access = this_admin.access_type;

            res.json(access);

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