const router = express.Router();

router.get('/:id', async(req, res, next)=>{

    try{

        let user_id = req.params.id;
        let find_user = await user_model.getByUniqueId(user_id);

        if(find_user){

            let data = {

                user_info : find_user

            }

            res.render('groups/groups-profile', data);

        }
        else{

            res.status(404).render('errors/404');

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;