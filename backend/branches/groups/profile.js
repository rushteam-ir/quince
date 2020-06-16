const router = express.Router();

router.get('/:id', async(req,res)=>{

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

        res.status(500).render('500', {error});

    }

});

module.exports = router;