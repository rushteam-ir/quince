const router = express.Router();

router.get('/:id', async(req, res, next)=>{

    try{

        let user_id = req.params.id;

        if(isObjectId(user_id)){

            res.render('groups/groups-profile');
        }
        else{

            res.redirect(`${config.backend_url}groups/admins`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;